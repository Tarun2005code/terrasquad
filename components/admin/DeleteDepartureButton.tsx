"use client";

import { useRouter } from "next/navigation";

export default function DeleteDepartureButton({
    dateId,
}:{
    dateId:number;
}){

const router=useRouter();

async function remove(){

if(!confirm("Delete departure date?")) return;

await fetch(
`/api/admin/expeditions/0/dates/${dateId}`,
{
method:"DELETE"
}
);

router.refresh();

}

return(
<button
onClick={remove}
className="rounded bg-red-600 px-3 py-1 text-white"
>
Delete
</button>
);

}