import axios, { type AxiosResponse } from "axios";

import type { ProductType } from "../types";

type ReturnType<T> = Promise<AxiosResponse<T>>;

export const getProducts = async (): Promise<ProductType[]> => {
  try {
    const response: AxiosResponse<ProductType[]> = await axios.get("/api/product");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ProductType을 export합니다.
export type { ProductType };

export const getProduct = async (id: string): Promise<ProductType> => {
  try {
    const response: AxiosResponse<ProductType> = await axios.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (newProduct: Omit<ProductType, "id" | "thumbnail">): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.post("/product", newProduct);
    return response;
  } catch (error) {
    throw error;
  }
};

export const modifyThumbnail = async (productId: string, thumbnail: File): ReturnType<{ product: ProductType }> => {
  try {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const response = axios.patch(`/product/thumbnail/${productId}`, formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const resposne = await axios.delete(`/api/product/${id}`);
    return resposne;
  } catch (error: any) {
    // 403 에러일 때 커스텀 에러 메시지 노출
    if (error.response && error.response.status === 403) {
      alert(error.response.data);
      return;
    }

    // 다른 에러는 그대로 throw
    throw error;
  }
};

export const modifyProduct = async (updateProduct: ProductType) => {
  try {
    const response = await axios.patch(`/product/${updateProduct.id}`, updateProduct);
    return response;
  } catch (error) {
    throw error;
  }
};
