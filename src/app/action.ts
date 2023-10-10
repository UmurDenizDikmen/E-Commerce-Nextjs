"use server";
import { revalidatePath } from "next/cache";
export default function revalidate() {
  revalidatePath("/", "page");
}
