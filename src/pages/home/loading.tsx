import Image from "next/image";

export default function Loading() {
  return <div className="w-full h-full flex items-center justify-center">
    <Image src="/../assets/loading.svg" alt="loading" width={800} height={600} />
  </div>
}