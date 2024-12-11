import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarView } from "./RadarView";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useWebRTC } from "@/hooks/useWebRTC";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const workoutTypes = [
  "Strength Training",
  "Cardio",
  "CrossFit",
  "Powerlifting",
  "Olympic Lifting",
  "Calisthenics",
  "General Fitness",
] as const;

const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
] as const;

const formSchema = z.object({
  workoutType: z.enum(workoutTypes),
  experienceLevel: z.enum(experienceLevels),
  gender: z.enum(["Male", "Female", "Other"]),
  preferredGender: z.enum(["Male", "Female", "Any"]),
  bio: z.string().max(200),
});

type FormData = z.infer<typeof formSchema>;

interface FinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinderModal: FC<FinderModalProps> = ({ isOpen, onClose }) => {
  const { location } = useGeoLocation();
  const { broadcastPresence, nearbyUsers } = useWebRTC();
  const [step, setStep] = useState<"form" | "map">("form");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!location) {
      console.error("No location available");
      return;
    }

    console.log("Form submitted:", data);

    try {
      await broadcastPresence({
        ...data,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      console.log("Presence broadcasted successfully");
      setStep("map");
    } catch (error) {
      console.error("Failed to broadcast presence:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {step === "form"
                  ? "Find Gym Buddies Nearby"
                  : "Nearby Gym Buddies"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {step === "form" ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Today's Workout
                    </label>
                    <select
                      {...register("workoutType")}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-space-gray p-2"
                    >
                      {workoutTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Experience Level
                    </label>
                    <select
                      {...register("experienceLevel")}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-space-gray p-2"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-space-gray p-2"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Training Partner
                    </label>
                    <select
                      {...register("preferredGender")}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-space-gray p-2"
                    >
                      <option value="Any">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quick Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-space-gray p-2"
                    rows={3}
                    placeholder="Tell potential gym buddies a bit about yourself..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-neon-mint to-blue-400 text-white py-3 rounded-lg font-medium"
                >
                  Find Buddies Nearby
                </motion.button>
              </form>
            ) : location && (
              <div className="h-[500px]">
                <RadarView
                  currentLocation={location}
                  nearbyUsers={nearbyUsers}
                  onUserSelect={(userId) => {
                    console.log('Selected user:', userId);
                    // Handle user selection
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
