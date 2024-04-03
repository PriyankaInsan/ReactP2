import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  name: z.string().min(1, { message: "Please Enter Name" }),
});

function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Test;
