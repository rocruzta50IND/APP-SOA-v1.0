import { useState, useEffect } from 'react';

export function useLibraryCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      if (window.electronAPI && typeof window.electronAPI.getLibraryCategories === 'function') {
        try {
          const cats = await window.electronAPI.getLibraryCategories();
          if (cats && cats.length > 0) {
            setCategories(cats);
            if (!category) setCategory(cats[0]);
          }
        } catch (e) {
          console.error("Failed to load categories", e);
        }
      }
    };
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    if (window.electronAPI && typeof window.electronAPI.createLibraryCategory === 'function') {
      try {
        const res = await window.electronAPI.createLibraryCategory(newCategoryName.trim());
        if (res.success) {
          const cats = await window.electronAPI.getLibraryCategories();
          setCategories(cats);
          setCategory(newCategoryName.trim());
          setIsCreatingCategory(false);
          setNewCategoryName("");
        } else {
          alert("Erro ao criar categoria: " + res.error);
        }
      } catch (e) {
         console.error(e);
         alert("Falha crítica ao criar categoria.");
      }
    } else {
       alert("Função disponível apenas no Electron.");
    }
  };

  return {
    categories,
    category,
    setCategory,
    isCreatingCategory,
    setIsCreatingCategory,
    newCategoryName,
    setNewCategoryName,
    handleCreateCategory
  };
}
