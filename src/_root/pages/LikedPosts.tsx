import GridPostList from "@/components/shared/GridPostList";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutatuions";
import { Loader } from "lucide-react";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (currentUser) {
    console.log("Liked posts:", currentUser.liked);
  } else {
    console.log("Current user not loaded yet");
  }
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.Liked?.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.Liked || []} showStats={false} />
    </>
  );
};

export default LikedPosts;
