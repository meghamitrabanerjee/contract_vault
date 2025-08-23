"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateContractPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  // Payment terms handlers
  const addPaymentTerm = () => setPaymentTerms((t) => [...t, ""]);
  const updatePaymentTerm = (idx: number, val: string) => {
    const arr = [...paymentTerms];
    arr[idx] = val;
    setPaymentTerms(arr);
  };
  const removePaymentTerm = (idx: number) => {
    setPaymentTerms((t) => t.filter((_, i) => i !== idx));
  };

  const validateForm = () => {
    if (!title || !clientEmail || !projectDescription || !totalAmount || !startDate || !endDate) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (paymentTerms.some((t) => t.trim() === "")) {
      toast.error("Please remove empty payment terms or fill them in.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      await axios.post("/api/contracts/create", {
        title,
        clientEmail,
        contractData: {
          projectDescription,
          totalAmount: Number(totalAmount),
          currency,
          startDate,
          endDate,
          paymentTerms, // ✅ sending payment terms instead of clauses
        },
      });
      toast.success("Contract created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to create contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-4xl bg-white border border-emerald-300 rounded-xl shadow-md">
        <CardHeader className="pb-4 border-b border-emerald-200/40">
          <CardTitle className="text-2xl font-bold text-emerald-700">
            Create New Contract
          </CardTitle>
          <CardDescription className="text-emerald-600">
            Fill out the details below to generate and send a contract to your client.
          </CardDescription>
          <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 text-sm p-4 mt-4 rounded-md">
            Before generating a contract, please make sure you understand the full workflow.
            <a href="/how-it-works" className="underline ml-1 hover:text-amber-900">Read How It Works →</a>
          </div>
        </CardHeader>

        <CardContent className="px-8 py-8 space-y-8">
          {/* Title + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Contract Title*</Label>
              <Input className="mt-2 border border-gray-300" placeholder="e.g. Website Design Agreement" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Client Email*</Label>
              <Input className="mt-2 border border-gray-300" type="email" placeholder="client@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <Label>Project Description*</Label>
            <Textarea
              rows={6} 
              className="mt-2 border border-gray-300" 
              placeholder="Describe project scope, deliverables and other relevant info"
              value={projectDescription} 
              onChange={(e) => setProjectDescription(e.target.value)} 
            />
          </div>

          {/* Amount + Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Total Amount*</Label>
              <Input className="mt-2 border border-gray-300" type="number" placeholder="1500" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={currency} onValueChange={(val) => setCurrency(val)}>
                <SelectTrigger className="mt-2 border border-gray-300">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Start Date*</Label>
              <Input className="mt-2 border border-gray-300" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <Label>End Date*</Label>
              <Input className="mt-2 border border-gray-300" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <Label>Payment Terms*</Label>
            <div className="space-y-2 mt-2">
              {paymentTerms.map((term, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <Input
                    className="border border-gray-300"
                    value={term}
                    onChange={(e) => updatePaymentTerm(idx, e.target.value)}
                    placeholder={`Payment Term ${idx + 1}`}
                  />
                  <button type="button" onClick={() => removePaymentTerm(idx)} className="text-red-500 font-bold px-2">×</button>
                </div>
              ))}
              <Button type="button" size="sm" onClick={addPaymentTerm}>+ Add Payment Term</Button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-8 flex justify-center">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-md"
            >
              {loading ? "Creating..." : "Create Contract"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContractPage;