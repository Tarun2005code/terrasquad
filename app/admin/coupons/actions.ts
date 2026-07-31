"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export async function createCoupon(
  formData: FormData
) {
  await requireAdmin();

  const code = String(
    formData.get("code") || ""
  )
    .trim()
    .toUpperCase();

  if (!code) {
    throw new Error(
      "Coupon code is required"
    );
  }

  await prisma.coupon.create({
    data: {
      code,
      description: String(
        formData.get("description") || ""
      ),
      type: formData.get("type") as any,
      value: Number(
        formData.get("value")
      ),
      minAmount: Number(
        formData.get("minAmount") || 0
      ),
      maxDiscount: formData.get(
        "maxDiscount"
      )
        ? Number(
            formData.get(
              "maxDiscount"
            )
          )
        : null,
      usageLimit: formData.get(
        "usageLimit"
      )
        ? Number(
            formData.get(
              "usageLimit"
            )
          )
        : null,
      active: true,
      expiresAt: formData.get(
        "expiresAt"
      )
        ? new Date(
            String(
              formData.get(
                "expiresAt"
              )
            )
          )
        : null,
    },
  });

  redirect("/admin/coupons");
}

export async function updateCoupon(
  formData: FormData
) {
  await requireAdmin();

  const id = Number(
    formData.get("id")
  );

  const code = String(
    formData.get("code") || ""
  )
    .trim()
    .toUpperCase();

  if (!id) {
    throw new Error(
      "Coupon ID is required"
    );
  }

  if (!code) {
    throw new Error(
      "Coupon code is required"
    );
  }

  await prisma.coupon.update({
    where: {
      id,
    },
    data: {
      code,
      description: String(
        formData.get("description") || ""
      ),
      type: formData.get("type") as any,
      value: Number(
        formData.get("value")
      ),
      minAmount: Number(
        formData.get("minAmount") || 0
      ),
      maxDiscount: formData.get(
        "maxDiscount"
      )
        ? Number(
            formData.get(
              "maxDiscount"
            )
          )
        : null,
      usageLimit: formData.get(
        "usageLimit"
      )
        ? Number(
            formData.get(
              "usageLimit"
            )
          )
        : null,
      active: !!formData.get("active"),
      expiresAt: formData.get(
        "expiresAt"
      )
        ? new Date(
            String(
              formData.get(
                "expiresAt"
              )
            )
          )
        : null,
    },
  });

  redirect("/admin/coupons");
}