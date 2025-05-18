"use client";

import { Container } from "@/components/layout/Container";
import CreateProductForm from "@/components/marketplace/CreateProductForm";

export default function CreateProductPage() {
  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
        <CreateProductForm />
      </div>
    </Container>
  );
} 