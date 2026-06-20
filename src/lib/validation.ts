import { z } from "zod";

export const enquirySchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(60).regex(/^[a-zA-Z\s'-]+$/, "Invalid characters"),
  lastName:  z.string().min(2, "Last name must be at least 2 characters").max(60).regex(/^[a-zA-Z\s'-]+$/, "Invalid characters"),
  email:     z.string().email("Please enter a valid email address").max(120),
  phone:     z.string().optional().refine((val) => !val || /^[+\d\s\-()]{7,20}$/.test(val), "Invalid phone number"),
  country:   z.string().min(2, "Please enter your country"),
  tripInterest:          z.string().min(1, "Please select a trip"),
  travelPartySize:       z.string().min(1, "Please select party size"),
  preferredTravelMonth:  z.string().min(1, "Please select a preferred month"),
  budget:    z.string().optional(),
  message:   z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  popiaConsent: z.literal(true, { message: "You must consent to data processing under POPIA to proceed." }),
  marketingConsent: z.boolean().optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const partySizeOptions = ["1 (Solo)", "2 (Couple)", "3–4", "5–8", "9–15", "16+ (Group)"];
export const monthOptions = ["January","February","March","April","May","June","July","August","September","October","November","December","Flexible"];
export const budgetOptions = ["Under R10,000 per person","R10,000 – R25,000 per person","R25,000 – R50,000 per person","R50,000+ per person","I prefer not to say"];
