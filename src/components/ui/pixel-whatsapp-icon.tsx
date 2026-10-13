"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

interface PixelWhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Clean, official vector WhatsApp Icon
 * Uses official FontAwesome / WhatsApp branding vector
 */
export function PixelWhatsAppIcon({
  className = "w-6 h-6",
  size,
  style,
  ...props
}: PixelWhatsAppIconProps) {
  return (
    <FaWhatsapp
      className={className}
      style={style}
      size={typeof size === "number" ? size : undefined}
      {...(props as any)}
    />
  );
}
