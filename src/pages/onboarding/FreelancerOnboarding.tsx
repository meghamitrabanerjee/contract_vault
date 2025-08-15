import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User, FileText, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { id: 1, title: "Create Account", icon: User },
  { id: 2, title: "Complete KYC", icon: Shield },
  { id: 3, title: "Draft Contract", icon: FileText },
];

const FreelancerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold">Contract Vault</span>
          </div>
          <h1 className="text-headline mb-2">Freelancer Setup</h1>
          <p className="text-muted-foreground">Let's get you ready to create and manage contracts</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-accent text-accent-foreground' 
                        : isCurrent 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </div>
                      <Badge variant={isCompleted ? 'default' : isCurrent ? 'secondary' : 'outline'} className="mt-1 text-xs">
                        Step {step.id}
                      </Badge>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${isCompleted ? 'bg-accent' : 'bg-border'} transition-all`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-medium bg-card/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {steps[currentStep - 1] && (
                <>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
                  </div>
                  {steps[currentStep - 1].title}
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="text-center py-8">
                <h3 className="text-title mb-4">Create Your Account</h3>
                <p className="text-muted-foreground mb-8">
                  We'll set up your freelancer profile and get you ready to start creating contracts.
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-medium mb-2">What you'll provide:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Professional email address</li>
                      <li>• Business name (or your name)</li>
                      <li>• Work category and skills</li>
                      <li>• Preferred payment methods</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center py-8">
                <h3 className="text-title mb-4">Complete KYC Verification</h3>
                <p className="text-muted-foreground mb-8">
                  For security and compliance, we need to verify your identity. This protects both you and your clients.
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-medium mb-2">Required documents:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Government-issued ID</li>
                      <li>• Proof of address</li>
                      <li>• Business registration (if applicable)</li>
                      <li>• Tax information</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <Shield className="w-4 h-4" />
                    <span>Bank-level encryption protects your data</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-8">
                <h3 className="text-title mb-4">Create Your First Contract</h3>
                <p className="text-muted-foreground mb-8">
                  Let's create your first contract template. You can customize this for each client project.
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="p-4 bg-muted rounded-lg text-left">
                    <h4 className="font-medium mb-2">Contract includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Project scope and deliverables</li>
                      <li>• Timeline and milestones</li>
                      <li>• Payment terms and schedule</li>
                      <li>• Revision and cancellation policies</li>
                    </ul>
                  </div>
                  <Link to="/dashboard">
                    <Button variant="accent" size="lg" className="w-full">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div>
            {currentStep > 1 ? (
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            ) : (
              <Link to="/role-selection">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Role Selection
                </Button>
              </Link>
            )}
          </div>
          
          {currentStep < steps.length && (
            <Button variant="hero" onClick={nextStep}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerOnboarding;