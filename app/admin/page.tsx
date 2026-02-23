"use client";
import { useState } from "react";
import { useQuery,useQueryClient, useMutation } from "@tanstack/react-query";
import styles from "@/src/styles/admin.module.css";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
};

export default function AdminPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery<Contact[]>({
    queryKey: ["contacts", page],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/contacts?_page=${page}&_limit=5`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },

    placeholderData: (previousData) => previousData,
  });


//delete
const queryClient=useQueryClient();
const deleteMutation = useMutation({
  mutationFn:async(id:number) =>{
    const res=await fetch(`http://localhost:3001/contacts/${id}`, {
      method:"DELETE",
    });
    if(!res.ok) throw new Error("Failed to delete");
    return id;
  },
  onSuccess:() => {
    queryClient.invalidateQueries({ queryKey: ["contacts"]});
  },
});

if (isLoading) return <p className={styles.loading}>Loading contacts...</p>;

return (
  <div className={styles.page}>
    <h1 className={styles.title}>Contact Submissions</h1>

    {data?.map((contact) => (
      <div key={contact.id} className={styles.card}>
         
        <p>
          <span className={styles.label}>Name:</span>{" "}
          <span className={styles.value}>{contact.name}</span>
        </p>
        <p>
          <span className={styles.label}>Email:</span>{" "}
          <span className={styles.value}>{contact.email}</span>
        </p>
        <p>
          <span className={styles.label}>Phone:</span>{" "}
          <span className={styles.value}>{contact.phone}</span>
        </p>

       <button
  className={styles.deleteButton}
  onClick={() => deleteMutation.mutate(contact.id)}
  disabled={deleteMutation.isPending}
>
  {deleteMutation.isPending ? "Deleting..." : "Delete"}
</button>
  
      </div>
    ))}

    <div className={styles.pagination}>
      <button
        className={styles.button}
        // onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className={styles.pageNumber}>Page {page}</span>

      <button
        className={styles.button}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
      
    </div>

    {isFetching && <p className={styles.loading}>Updating...</p>}
  </div>
);
}