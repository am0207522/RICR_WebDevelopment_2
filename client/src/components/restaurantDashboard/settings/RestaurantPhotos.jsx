import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config";
import toast from "react-hot-toast";

const RestaurantPhotos = () => {
  const { user } = useAuth();

  const MAX_FILE_SIZE = 1024 * 1024; // 1MB
  const MAX_GALLERY_IMAGES = 8;

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [errors, setErrors] = useState({ cover: "", gallery: "" });

  // ADDED: these track what's already saved on the server so a page refresh
  // doesn't look like all your photos disappeared.
  const [existingCoverUrl, setExistingCoverUrl] = useState(null);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const coverPreview = useMemo(() => {
    return coverImage ? URL.createObjectURL(coverImage) : "";
  }, [coverImage]);

  const galleryPreviews = useMemo(() => {
    return galleryImages.map((image) => ({
      file: image,
      url: URL.createObjectURL(image),
      key: `${image.name}-${image.lastModified}`,
    }));
  }, [galleryImages]);

  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((imagePreview) => {
        URL.revokeObjectURL(imagePreview.url);
      });
    };
  }, [galleryPreviews]);

  // ADDED: load whatever cover/gallery images already exist for this restaurant
  // so they show up here instead of always looking empty.
  const fetchExistingPhotos = async () => {
    try {
      setIsLoadingExisting(true);

      const res = await api.get(`/restaurant/get-resturant-data?id=${user._id}`);

      // Backend returns data as an array (Restaurant.find()) even though there's
      // only ever one restaurant per manager — unwrap it.
      const fetched = res.data.data;
      const restaurant = Array.isArray(fetched) ? fetched[0] : fetched;

      setExistingCoverUrl(restaurant?.coverImage?.url || null);
      setExistingGalleryImages(restaurant?.restaurantImage || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred fetching existing photos.",
      );
    } finally {
      setIsLoadingExisting(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchExistingPhotos();
    }
  }, [user]);

  const handleCoverImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setCoverImage(null);
      setErrors((prev) => ({ ...prev, cover: "" }));
      return;
    }

    if (file.size >= MAX_FILE_SIZE) {
      setCoverImage(null);
      setErrors((prev) => ({
        ...prev,
        cover: "Cover image must be less than 1MB.",
      }));
      event.target.value = "";
      return;
    }

    setCoverImage(file);
    setErrors((prev) => ({ ...prev, cover: "" }));
  };

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const oversizedFiles = files.filter((file) => file.size >= MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        gallery: "Each restaurant image must be less than 1MB.",
      }));
      event.target.value = "";
      return;
    }

    setGalleryImages((prevImages) => {
      const merged = [...prevImages, ...files];
      if (merged.length > MAX_GALLERY_IMAGES) {
        setErrors((prev) => ({
          ...prev,
          gallery: `You can upload up to ${MAX_GALLERY_IMAGES} restaurant images only.`,
        }));
        return merged.slice(0, MAX_GALLERY_IMAGES);
      }

      setErrors((prev) => ({ ...prev, gallery: "" }));
      return merged;
    });

    event.target.value = "";
  };

  const removeGalleryImage = (indexToRemove) => {
    setGalleryImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
    setErrors((prev) => ({ ...prev, gallery: "" }));
  };

  // ADDED: this is the missing piece — there was no submit handler or save
  // button anywhere in this file before, so nothing you selected ever reached
  // the server. This posts to the same endpoint the rest of the Restaurant
  // settings pages use.
  //
  // Note on backend behavior: the server replaces the ENTIRE gallery each time
  // new restaurantImage files are sent (it deletes the old set and uploads the
  // new one) — it does not merge/append. So "Save" should be done with the full
  // set of gallery images you want to keep selected at once.
  const handleSavePhotos = async () => {
    if (!coverImage && galleryImages.length === 0) {
      toast.error("Please select at least one photo to upload.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = new FormData();
      if (coverImage) {
        payload.append("coverImage", coverImage);
      }
      galleryImages.forEach((file) => {
        payload.append("restaurantImage", file);
      });

      const res = await api.post(`/restaurant/update-profile`, payload);

      const updated = res.data.data;
      setExistingCoverUrl(updated?.coverImage?.url || existingCoverUrl);
      setExistingGalleryImages(updated?.restaurantImage || existingGalleryImages);

      setCoverImage(null);
      setGalleryImages([]);

      toast.success(res.data.message || "Photos updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update restaurant photos",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-3 items-start">
        <div className="bg-(--color-base-100) rounded-xl border border-(--color-secondary)/40 shadow-sm p-4 h-full">
          <div className="flex items-center justify-between border-b border-(--color-secondary) pb-2 mb-3">
            <div className="">
              <h3 className="text-sm font-semibold text-(--color-primary)">
                Cover Image
              </h3>
              <p className="text-xs text-(--color-secondary)">
                Upload one hero image under 1MB.
              </p>
            </div>
            <div className="text-[11px] px-2 py-1 rounded-full bg-(--color-primary)/10 text-(--color-primary) font-medium">
              1 file
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-dashed border-(--color-secondary) bg-(--color-base-100) p-3">
              <label
                htmlFor="coverImage"
                className="inline-flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1.5 rounded-md text-xs cursor-pointer shadow-sm hover:opacity-95 transition"
              >
                <MdOutlineAddAPhoto className="text-sm" />
                Upload Cover Image
              </label>
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              <p className="mt-2 text-xs text-(--color-secondary)">
                Best for banner-style photos. JPG, PNG, AVIF, WEBP all work.
              </p>
              {errors.cover && (
                <p className="text-xs text-(--color-error) mt-2">
                  {errors.cover}
                </p>
              )}
            </div>

            {coverImage && coverPreview ? (
              <div className="overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm">
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                  <p className="truncate font-medium">{coverImage.name}</p>
                  <span className="shrink-0 rounded-full bg-(--color-secondary)/20 px-2 py-1 text-[11px]">
                    {(coverImage.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            ) : existingCoverUrl ? (
              <div className="overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm">
                <div className="relative">
                  <img
                    src={existingCoverUrl}
                    alt="Current Cover"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                  <p className="truncate font-medium">Current cover image</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-(--color-secondary) bg-linear-to-br from-white to-(--color-base-100) px-4 py-8 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                  <MdOutlineAddAPhoto className="text-2xl" />
                </div>
                <p className="text-sm font-semibold text-(--color-primary)">
                  No cover selected
                </p>
                <p className="mt-1 text-xs text-(--color-secondary-content)">
                  Add a clean hero image to make this restaurant stand out.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-(--color-base-100) rounded-xl border border-(--color-secondary)/40 shadow-sm p-4 h-full">
          <div className="flex items-start justify-between gap-3 border-b border-(--color-secondary) mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-(--color-primary)">
                  Other Restaurant Images
                </h3>
                <span className="text-[11px] px-2 py-1 rounded-full bg-(--color-primary)/10 text-(--color-primary) font-medium">
                  {galleryImages.length}/{MAX_GALLERY_IMAGES}
                </span>
              </div>
              <p className="text-xs text-(--color-secondary-content) mt-0.5">
                Upload up to {MAX_GALLERY_IMAGES} images, each less than 1MB.
              </p>
            </div>

            <div className="shrink-0">
              <label
                htmlFor="galleryImages"
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs shadow-sm transition ${galleryImages.length >= MAX_GALLERY_IMAGES ? "bg-(--color-secondary) text-(--color-secondary-content) cursor-not-allowed" : "bg-(--color-primary) text-(--color-primary-content) cursor-pointer hover:opacity-95"}`}
              >
                <MdOutlineAddAPhoto className="text-sm" />
                Upload Restaurant Images
              </label>
              <input
                id="galleryImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
                disabled={galleryImages.length >= MAX_GALLERY_IMAGES}
                className="hidden"
              />
            </div>
          </div>

          {errors.gallery && (
            <div className="mb-3 rounded-lg border border-(--color-error)/30 bg-(--color-error)/5 px-3 py-2">
              <p className="text-xs text-(--color-error)">{errors.gallery}</p>
            </div>
          )}

          {galleryPreviews.length > 0 || existingGalleryImages.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {existingGalleryImages.map((image, index) => (
                <div
                  key={image.publicId || `existing-${index}`}
                  className="group overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={`Restaurant ${index + 1}`}
                      className="h-36 w-full object-cover"
                    />
                  </div>

                  <div className="px-3 py-2">
                    <p className="truncate text-xs font-medium text-(--color-primary)">
                      Saved photo
                    </p>
                  </div>
                </div>
              ))}

              {galleryPreviews.map((imagePreview, index) => (
                <div
                  key={imagePreview.key}
                  className="group overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative">
                    <img
                      src={imagePreview.url}
                      alt={`Restaurant ${index + 1}`}
                      className="h-36 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-(--color-error) shadow-sm ring-1 ring-(--color-error)/20 transition hover:bg-(--color-error) hover:text-(--color-error-content)"
                      aria-label={`Remove ${imagePreview.file.name}`}
                    >
                      <IoMdClose className="text-lg" />
                    </button>
                  </div>

                  <div className="px-3 py-2">
                    <p className="truncate text-xs font-medium text-(--color-primary)">
                      {imagePreview.file.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-(--color-secondary-content)">
                      {(imagePreview.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-(--color-secondary) bg-linear-to-br from-white to-(--color-base-100) px-4 py-10 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                <MdOutlineAddAPhoto className="text-2xl" />
              </div>
              <p className="text-sm font-semibold text-(--color-primary)">
                No restaurant images yet
              </p>
              <p className="mt-1 text-xs text-(--color-secondary-content)">
                Add up to 10 supporting photos to show the dining space, food,
                and kitchen.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADDED: there was no submit action anywhere in this file before — this is
          the missing piece that actually sends your selected photos to the server. */}
      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={handleSavePhotos}
          disabled={isSaving || isLoadingExisting}
          className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded-md text-sm shadow-sm hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <LuLoaderCircle className="animate-spin" /> Saving...
            </>
          ) : (
            "Save Photos"
          )}
        </button>
      </div>
    </div>
  );
};

export default RestaurantPhotos;





/// my 1st
// import React, { useEffect, useMemo, useState } from "react";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";

// const RestaurantPhotos = () => {
//   const MAX_FILE_SIZE = 1024 * 1024; // 1MB
//   const MAX_GALLERY_IMAGES = 8;

//   const [coverImage, setCoverImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [errors, setErrors] = useState({ cover: "", gallery: "" });

//   const coverPreview = useMemo(() => {
//     return coverImage ? URL.createObjectURL(coverImage) : "";
//   }, [coverImage]);

//   const galleryPreviews = useMemo(() => {
//     return galleryImages.map((image) => ({
//       file: image,
//       url: URL.createObjectURL(image),
//       key: `${image.name}-${image.lastModified}`,
//     }));
//   }, [galleryImages]);

//   useEffect(() => {
//     return () => {
//       if (coverPreview) {
//         URL.revokeObjectURL(coverPreview);
//       }
//     };
//   }, [coverPreview]);

//   useEffect(() => {
//     return () => {
//       galleryPreviews.forEach((imagePreview) => {
//         URL.revokeObjectURL(imagePreview.url);
//       });
//     };
//   }, [galleryPreviews]);

//   const handleCoverImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       setCoverImage(null);
//       setErrors((prev) => ({ ...prev, cover: "" }));
//       return;
//     }

//     if (file.size >= MAX_FILE_SIZE) {
//       setCoverImage(null);
//       setErrors((prev) => ({
//         ...prev,
//         cover: "Cover image must be less than 1MB.",
//       }));
//       event.target.value = "";
//       return;
//     }

//     setCoverImage(file);
//     setErrors((prev) => ({ ...prev, cover: "" }));
//   };

//   const handleGalleryImagesChange = (event) => {
//     const files = Array.from(event.target.files || []);

//     if (files.length === 0) {
//       return;
//     }

//     const oversizedFiles = files.filter((file) => file.size >= MAX_FILE_SIZE);
//     if (oversizedFiles.length > 0) {
//       setErrors((prev) => ({
//         ...prev,
//         gallery: "Each restaurant image must be less than 1MB.",
//       }));
//       event.target.value = "";
//       return;
//     }

//     setGalleryImages((prevImages) => {
//       const merged = [...prevImages, ...files];
//       if (merged.length > MAX_GALLERY_IMAGES) {
//         setErrors((prev) => ({
//           ...prev,
//           gallery: `You can upload up to ${MAX_GALLERY_IMAGES} restaurant images only.`,
//         }));
//         return merged.slice(0, MAX_GALLERY_IMAGES);
//       }

//       setErrors((prev) => ({ ...prev, gallery: "" }));
//       return merged;
//     });

//     event.target.value = "";
//   };

//   const removeGalleryImage = (indexToRemove) => {
//     setGalleryImages((prevImages) =>
//       prevImages.filter((_, index) => index !== indexToRemove),
//     );
//     setErrors((prev) => ({ ...prev, gallery: "" }));
//   };

//   return (
//     <div className="p-2">
//       <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-3 items-start">
//         <div className="bg-(--color-base-100) rounded-xl border border-(--color-secondary)/40 shadow-sm p-4 h-full">
//           <div className="flex items-center justify-between border-b border-(--color-secondary) pb-2 mb-3">
//             <div className="">
//               <h3 className="text-sm font-semibold text-(--color-primary)">
//                 Cover Image
//               </h3>
//               <p className="text-xs text-(--color-secondary)">
//                 Upload one hero image under 1MB.
//               </p>
//             </div>
//             <div className="text-[11px] px-2 py-1 rounded-full bg-(--color-primary)/10 text-(--color-primary) font-medium">
//               1 file
//             </div>
//           </div>

//           <div className="space-y-3">
//             <div className="rounded-xl border border-dashed border-(--color-secondary) bg-(--color-base-100) p-3">
//               <label
//                 htmlFor="coverImage"
//                 className="inline-flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1.5 rounded-md text-xs cursor-pointer shadow-sm hover:opacity-95 transition"
//               >
//                 <MdOutlineAddAPhoto className="text-sm" />
//                 Upload Cover Image
//               </label>
//               <input
//                 id="coverImage"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleCoverImageChange}
//                 className="hidden"
//               />
//               <p className="mt-2 text-xs text-(--color-secondary)">
//                 Best for banner-style photos. JPG, PNG, AVIF, WEBP all work.
//               </p>
//               {errors.cover && (
//                 <p className="text-xs text-(--color-error) mt-2">
//                   {errors.cover}
//                 </p>
//               )}
//             </div>

//             {coverImage && coverPreview ? (
//               <div className="overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm">
//                 <div className="relative">
//                   <img
//                     src={coverPreview}
//                     alt="Cover Preview"
//                     className="w-full h-56 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
//                 </div>
//                 <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
//                   <p className="truncate font-medium">{coverImage.name}</p>
//                   <span className="shrink-0 rounded-full bg-(--color-secondary)/20 px-2 py-1 text-[11px]">
//                     {(coverImage.size / 1024).toFixed(1)} KB
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="rounded-xl border border-dashed border-(--color-secondary) bg-linear-to-br from-white to-(--color-base-100) px-4 py-8 text-center">
//                 <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
//                   <MdOutlineAddAPhoto className="text-2xl" />
//                 </div>
//                 <p className="text-sm font-semibold text-(--color-primary)">
//                   No cover selected
//                 </p>
//                 <p className="mt-1 text-xs text-(--color-secondary-content)">
//                   Add a clean hero image to make this restaurant stand out.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-(--color-base-100) rounded-xl border border-(--color-secondary)/40 shadow-sm p-4 h-full">
//           <div className="flex items-start justify-between gap-3 border-b border-(--color-secondary) mb-3">
//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="text-sm font-semibold text-(--color-primary)">
//                   Other Restaurant Images
//                 </h3>
//                 <span className="text-[11px] px-2 py-1 rounded-full bg-(--color-primary)/10 text-(--color-primary) font-medium">
//                   {galleryImages.length}/{MAX_GALLERY_IMAGES}
//                 </span>
//               </div>
//               <p className="text-xs text-(--color-secondary-content) mt-0.5">
//                 Upload up to {MAX_GALLERY_IMAGES} images, each less than 1MB.
//               </p>
//             </div>

//             <div className="shrink-0">
//               <label
//                 htmlFor="galleryImages"
//                 className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs shadow-sm transition ${galleryImages.length >= MAX_GALLERY_IMAGES ? "bg-(--color-secondary) text-(--color-secondary-content) cursor-not-allowed" : "bg-(--color-primary) text-(--color-primary-content) cursor-pointer hover:opacity-95"}`}
//               >
//                 <MdOutlineAddAPhoto className="text-sm" />
//                 Upload Restaurant Images
//               </label>
//               <input
//                 id="galleryImages"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleGalleryImagesChange}
//                 disabled={galleryImages.length >= MAX_GALLERY_IMAGES}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {errors.gallery && (
//             <div className="mb-3 rounded-lg border border-(--color-error)/30 bg-(--color-error)/5 px-3 py-2">
//               <p className="text-xs text-(--color-error)">{errors.gallery}</p>
//             </div>
//           )}

//           {galleryPreviews.length > 0 ? (
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//               {galleryPreviews.map((imagePreview, index) => (
//                 <div
//                   key={imagePreview.key}
//                   className="group overflow-hidden rounded-xl border border-(--color-secondary) bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                 >
//                   <div className="relative">
//                     <img
//                       src={imagePreview.url}
//                       alt={`Restaurant ${index + 1}`}
//                       className="h-36 w-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeGalleryImage(index)}
//                       className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-(--color-error) shadow-sm ring-1 ring-(--color-error)/20 transition hover:bg-(--color-error) hover:text-(--color-error-content)"
//                       aria-label={`Remove ${imagePreview.file.name}`}
//                     >
//                       <IoMdClose className="text-lg" />
//                     </button>
//                   </div>

//                   <div className="px-3 py-2">
//                     <p className="truncate text-xs font-medium text-(--color-primary)">
//                       {imagePreview.file.name}
//                     </p>
//                     <p className="mt-0.5 text-[11px] text-(--color-secondary-content)">
//                       {(imagePreview.file.size / 1024).toFixed(1)} KB
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-xl border border-dashed border-(--color-secondary) bg-linear-to-br from-white to-(--color-base-100) px-4 py-10 text-center">
//               <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
//                 <MdOutlineAddAPhoto className="text-2xl" />
//               </div>
//               <p className="text-sm font-semibold text-(--color-primary)">
//                 No restaurant images yet
//               </p>
//               <p className="mt-1 text-xs text-(--color-secondary-content)">
//                 Add up to 10 supporting photos to show the dining space, food,
//                 and kitchen.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantPhotos;