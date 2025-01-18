import UserAuth from "../userAuth";
import { Header } from "@/components";
import { UserAuthModeType } from "../userAuth.type";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: UserAuthModeType }>;
}) {
  const slug: UserAuthModeType = (await params).slug;

  return (
    <>
      <Header />
      <UserAuth mode={slug} />
    </>
  );
}
