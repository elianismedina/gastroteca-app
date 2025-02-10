"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "../../../../components/ui/button";

type SubmitButtonProps = ButtonProps & { children?: React.ReactNode };

function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} disabled={pending}>
      {pending && <ReloadIcon className="animate-spin mr-2" />}
      {children}
    </Button>
  );
}

export default SubmitButton;
