import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: "mongodb+srv://dev-api:XTm9xRL08bsY2PWq@cluster0.j2ezskb.mongodb.net/myapp?retryWrites=true&w=majority",
    NEXTAUTH_SECRET: "Cbu2CjLlqrIiZyhnJ6YDmMb6WtJolYMUQrqK9K16TCg="
  }
};

export default nextConfig;