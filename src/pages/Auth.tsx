import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Auth = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [otpValue, setOtpValue] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);

    toast({
      title: "OTP sent",
      description: `Demo OTP: ${otp}`,
    });
  };

  const handleVerifyOtp = () => {
    if (!otpSent) {
      toast({ title: "Send OTP first", description: "Please request OTP verification first.", variant: "destructive" });
      return;
    }

    if (otpValue === generatedOtp) {
      setOtpVerified(true);
      toast({ title: "Mobile number verified", description: "OTP verification successful." });
      return;
    }

    toast({ title: "Incorrect OTP", description: "Please check the OTP and try again.", variant: "destructive" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      toast({
        title: "OTP verification required",
        description: "Please verify your mobile number before registering.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const registrationData = {
      name,
      mobileNumber,
      location,
      businessType,
      incomeRange,
      preferredLanguage: selectedLanguage,
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem("sakshamnari_registration", JSON.stringify(registrationData));
    await setLanguage(selectedLanguage);

    toast({
      title: "Registration successful",
      description: "Your account details have been saved. Start exploring personalized services.",
    });

    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-xl border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <a href="/" className="font-display text-2xl font-bold text-foreground">
              Saksham<span className="text-primary">Nari</span>
            </a>
            <CardTitle className="font-display text-xl">User Registration</CardTitle>
            <CardDescription>
              Create your account for personalized financial services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <div className="flex gap-2">
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    required
                  />
                  <Button type="button" variant="outline" onClick={handleSendOtp}>Send OTP</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">OTP Verification</label>
                <div className="flex gap-2">
                  <Input
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    inputMode="numeric"
                    required
                  />
                  <Button type="button" variant="outline" onClick={handleVerifyOtp}>Verify OTP</Button>
                </div>
                {otpVerified && <p className="text-xs text-success">Mobile number verified.</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City / District"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail / Shop</option>
                    <option value="tailoring">Tailoring / Fashion</option>
                    <option value="food">Food / Catering</option>
                    <option value="agri">Agri / Dairy</option>
                    <option value="services">Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Income Range</label>
                  <select
                    value={incomeRange}
                    onChange={(e) => setIncomeRange(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select income range</option>
                    <option value="under_10k">Under Rs. 10,000 / month</option>
                    <option value="10k_25k">Rs. 10,000 - Rs. 25,000 / month</option>
                    <option value="25k_50k">Rs. 25,000 - Rs. 50,000 / month</option>
                    <option value="above_50k">Above Rs. 50,000 / month</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Language Selection</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeLabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
