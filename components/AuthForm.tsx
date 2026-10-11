"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { z } from "zod";
import type { AuthFormProps, AuthFormValues } from "@/types/types";

const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name."),
    lastName: z.string().trim().min(1, "Enter your last name."),
    address: z.string().trim().min(5, "Enter your street address."),
    state: z.string().trim().regex(/^[A-Za-z]{2}$/, "Enter a 2-letter state code."),
    postalCode: z.string().trim().regex(/^\d{5}(?:-\d{4})?$/, "Enter a valid ZIP code."),
    dateOfBirth: z.iso.date("Enter a valid date of birth."),
    ssn: z.string().regex(/^\d{4}$/, "Enter the last 4 digits of your SSN."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((values) => new Date(`${values.dateOfBirth}T00:00:00`) < new Date(), {
    message: "Date of birth must be in the past.",
    path: ["dateOfBirth"],
  });

function createAuthResolver(isSignUp: boolean): Resolver<AuthFormValues> {
  return (values) => {
    const result = isSignUp
      ? signUpSchema.safeParse(values)
      : signInSchema.safeParse(values);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<AuthFormValues> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (
        (field === "firstName" ||
          field === "lastName" ||
          field === "address" ||
          field === "state" ||
          field === "postalCode" ||
          field === "dateOfBirth" ||
          field === "ssn" ||
          field === "email" ||
          field === "password") &&
        !errors[field]
      ) {
        errors[field] = { type: "zod", message: issue.message };
      }
    }

    return { values: {}, errors };
  };
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const [formMessage, setFormMessage] = useState("");
  const resolver = useMemo(() => createAuthResolver(isSignUp), [isSignUp]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (_values: AuthFormValues) => {
    setFormMessage("");
    setFormMessage("Your details are valid. Account authentication is not connected yet.");
  };

  return (
    <div className={`auth-form-wrap${isSignUp ? " auth-form-signup" : ""}`}>
      <Link href="/" className="auth-brand" aria-label="Horizon home">
        <span className="brand-mark">◆</span>
        <span>Horizon</span>
      </Link>
      <h1>{isSignUp ? "Sign up" : "Log in"}</h1>
      <p className="auth-intro">
        {isSignUp
          ? "Please enter your details."
          : "Welcome back! Please enter your details."}
      </p>

      <form
        className={`auth-form${isSignUp ? " auth-signup-form" : ""}`}
        onSubmit={handleSubmit(onSubmit, () => setFormMessage(""))}
        noValidate
      >
        {isSignUp && (
          <>
            <label className="auth-field">
              <span>First Name</span>
              <input autoComplete="given-name" placeholder="Enter your first name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "first-name-error" : undefined} {...register("firstName")} />
              {errors.firstName && <span className="auth-error" id="first-name-error">{errors.firstName.message}</span>}
            </label>
            <label className="auth-field">
              <span>Last Name</span>
              <input autoComplete="family-name" placeholder="ex: Doe" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "last-name-error" : undefined} {...register("lastName")} />
              {errors.lastName && <span className="auth-error" id="last-name-error">{errors.lastName.message}</span>}
            </label>
            <label className="auth-field auth-field-wide">
              <span>Address</span>
              <input autoComplete="street-address" placeholder="Enter your specific address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} {...register("address")} />
              {errors.address && <span className="auth-error" id="address-error">{errors.address.message}</span>}
            </label>
            <label className="auth-field">
              <span>State</span>
              <input autoComplete="address-level1" placeholder="ex: NY" maxLength={2} aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? "state-error" : undefined} {...register("state")} />
              {errors.state && <span className="auth-error" id="state-error">{errors.state.message}</span>}
            </label>
            <label className="auth-field">
              <span>Postal Code</span>
              <input autoComplete="postal-code" inputMode="numeric" placeholder="ex: 11101" aria-invalid={Boolean(errors.postalCode)} aria-describedby={errors.postalCode ? "postal-code-error" : undefined} {...register("postalCode")} />
              {errors.postalCode && <span className="auth-error" id="postal-code-error">{errors.postalCode.message}</span>}
            </label>
            <label className="auth-field">
              <span>Date of Birth</span>
              <input type="date" autoComplete="bday" aria-invalid={Boolean(errors.dateOfBirth)} aria-describedby={errors.dateOfBirth ? "date-of-birth-error" : undefined} {...register("dateOfBirth")} />
              {errors.dateOfBirth && <span className="auth-error" id="date-of-birth-error">{errors.dateOfBirth.message}</span>}
            </label>
            <label className="auth-field">
              <span>SSN (last 4 digits)</span>
              <input type="password" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="••••" aria-invalid={Boolean(errors.ssn)} aria-describedby={errors.ssn ? "ssn-error" : undefined} {...register("ssn")} />
              {errors.ssn && <span className="auth-error" id="ssn-error">{errors.ssn.message}</span>}
            </label>
          </>
        )}

        <label className={`auth-field${isSignUp ? " auth-field-wide" : ""}`}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && <span className="auth-error" id="email-error">{errors.email.message}</span>}
        </label>

        <label className={`auth-field${isSignUp ? " auth-field-wide" : ""}`}>
          <span>Password</span>
          <input
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && <span className="auth-error" id="password-error">{errors.password.message}</span>}
        </label>

        <button className={`auth-submit${isSignUp ? " auth-field-wide" : ""}`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : isSignUp ? "Sign up" : "Login"}
        </button>
        {formMessage && <p className="auth-success" role="status">{formMessage}</p>}
      </form>

      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Log in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
