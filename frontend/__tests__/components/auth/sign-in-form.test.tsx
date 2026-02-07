import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { SignInForm } from "@/components/auth/sign-in-form"

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

vi.mock("@/lib/auth-client", () => ({
  signIn: {
    email: vi.fn(),
  },
}))

describe("SignInForm", () => {
  it("renders the sign in form", () => {
    render(<SignInForm />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/sign-up"
    )
  })
})
