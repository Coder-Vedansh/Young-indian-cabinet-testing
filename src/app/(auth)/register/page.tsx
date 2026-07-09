"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, ChevronLeft, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Required"),
  fatherName: z.string().min(2, "Required"),
  motherName: z.string().min(2, "Required"),
  gender: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  mobileNumber: z.string().min(10, "Invalid Number"),
  altMobileNumber: z.string().optional(),
  country: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  pincode: z.string().min(1, "Required"),
  fullAddress: z.string().min(5, "Required"),
  occupation: z.string().min(1, "Required"),
  organization: z.string().optional(),
  qualification: z.string().min(1, "Required"),
  skills: z.string().optional(),
  preferredStateId: z.string().optional(),
  reasonForJoining: z.string().optional(),
  acceptedTerms: z.boolean().refine((val) => val === true, "Must accept terms"),
});

type FormValues = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { acceptedTerms: false }
  });

  const nextStep = async () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "fatherName", "motherName", "gender", "dob", "nationality"];
    if (step === 2) fieldsToValidate = ["mobileNumber"];
    if (step === 3) fieldsToValidate = ["country", "state", "district", "city", "pincode", "fullAddress"];
    if (step === 4) fieldsToValidate = ["occupation", "qualification"];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // For MVP, we need to pass credentials if they are logged in.
        // Actually the MVP registration might happen BEFORE login, or AFTER signup.
        // Assuming the user is signed up and logged in, we pass credentials.
        credentials: "include",
        body: JSON.stringify({ ...data, acceptedCode: data.acceptedTerms, acceptedPrivacy: data.acceptedTerms }),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Failed to submit application. Ensure you are logged in.");
      }
    } catch (e) {
      alert("Error submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-muted-foreground mb-6">Your Youth Assembly application has been received. Our team will review it shortly. You will receive an email upon approval.</p>
          <Button onClick={() => router.push("/")} className="w-full">Return Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-12 px-4 bg-muted/20">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold">Youth Assembly Registration</h1>
        <p className="text-muted-foreground">Step {step} of 7</p>
        <div className="flex gap-2 justify-center mt-4">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className={`h-2 w-12 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <Card className="w-full max-w-2xl shadow-lg border-t-4 border-t-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
            
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <CardTitle>Personal Information</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input {...register("fullName")} placeholder="John Doe" />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" {...register("dob")} />
                    {errors.dob && <p className="text-xs text-red-500">{errors.dob.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Father's Name</Label>
                    <Input {...register("fatherName")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Mother's Name</Label>
                    <Input {...register("motherName")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("gender")}>
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Input {...register("nationality")} defaultValue="Indian" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Info */}
            {step === 2 && (
              <div className="space-y-4">
                <CardTitle>Contact Details</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <Input {...register("mobileNumber")} placeholder="+91..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Alternate Number</Label>
                    <Input {...register("altMobileNumber")} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Address */}
            {step === 3 && (
              <div className="space-y-4">
                <CardTitle>Residential Address</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input {...register("country")} defaultValue="India" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input {...register("state")} />
                  </div>
                  <div className="space-y-2">
                    <Label>District</Label>
                    <Input {...register("district")} />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input {...register("city")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input {...register("pincode")} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Full Address</Label>
                    <Textarea {...register("fullAddress")} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Education */}
            {step === 4 && (
              <div className="space-y-4">
                <CardTitle>Education & Profession</CardTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Occupation</Label>
                    <Input {...register("occupation")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization/College</Label>
                    <Input {...register("organization")} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Highest Qualification</Label>
                    <Input {...register("qualification")} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Key Skills</Label>
                    <Input {...register("skills")} placeholder="e.g. Public Speaking, Writing" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Youth Assembly */}
            {step === 5 && (
              <div className="space-y-4">
                <CardTitle>Youth Assembly Choices</CardTitle>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Why do you want to join the Youth Assembly?</Label>
                    <Textarea {...register("reasonForJoining")} rows={4} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Documents */}
            {step === 6 && (
              <div className="space-y-4">
                <CardTitle>Document Uploads</CardTitle>
                <CardDescription>Note: For the MVP, actual file uploads are mocked in this UI step.</CardDescription>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-muted/50">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Passport Photo</span>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-muted/50">
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Government ID</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Declaration */}
            {step === 7 && (
              <div className="space-y-4">
                <CardTitle>Declaration</CardTitle>
                <div className="flex items-start space-x-2 mt-4 p-4 border rounded-lg bg-muted/20">
                  <input type="checkbox" {...register("acceptedTerms")} className="mt-1 h-4 w-4" />
                  <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I declare that all information provided is true to the best of my knowledge. I agree to abide by the Youth Assembly code of conduct.
                    </p>
                  </div>
                </div>
                {errors.acceptedTerms && <p className="text-xs text-red-500">{errors.acceptedTerms.message}</p>}
              </div>
            )}
            
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < 7 ? (
              <Button type="button" onClick={nextStep}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"} <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
