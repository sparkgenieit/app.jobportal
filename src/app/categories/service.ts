import { Category } from './types';
import { API_BASE_URL } from '@/lib/constants';

const API_URL = `${API_BASE_URL}/categories`;

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
}

export async function fetchCategories(): Promise<Category[]> {
  const token = getToken();
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  return res.json();
}

// ✅ FormData version of addCategory
export async function addCategory(data: FormData): Promise<Category> {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data, // Don't set Content-Type when sending FormData
  });
  return res.json();
}

// ✅ FormData version of updateCategory
export async function updateCategory(id: number, data: FormData): Promise<Category> {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const token = getToken();
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
