import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Authorize images from my domain
  images: {
    domains: ['zantora.shop'],
  },
};

export default withPayload(nextConfig);
