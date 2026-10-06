"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

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
        (field === "name" ||
          field === "email" ||
          field === "password" ||
          field === "confirmPassword") &&
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
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (_values: AuthFormValues) => {
    setFormMessage("");
    setFormMessage("Your details are valid. Account authentication is not connected yet.");
  };

  return (
    <div className="auth-form-wrap">
      <Link href="/" className="auth-brand" aria-label="Horizon home">
        <span className="brand-mark">◆</span>
        <span>Horizon</span>
      </Link>
      <h1>{isSignUp ? "Create an account" : "Log in"}</h1>
      <p className="auth-intro">
        {isSignUp
          ? "Get started with a secure account."
          : "Welcome back! Please enter your details."}
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit, () => setFormMessage(""))}
        noValidate
      >
        {isSignUp && (
          <label className="auth-field">
            <span>Full name</span>
            <input
              autoComplete="name"
              placeholder="Enter your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && <span className="auth-error" id="name-error">{errors.name.message}</span>}
          </label>
        )}

        <label className="auth-field">
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

        <label className="auth-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password", { deps: isSignUp ? ["confirmPassword"] : undefined })}
          />
          {errors.password && <span className="auth-error" id="password-error">{errors.password.message}</span>}
        </label>

        {isSignUp && (
          <label className="auth-field">
            <span>Confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="auth-error" id="confirm-password-error">{errors.confirmPassword.message}</span>
            )}
          </label>
        )}

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : isSignUp ? "Create account" : "Login"}
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
