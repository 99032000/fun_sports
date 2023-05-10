import { Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  // const [supabase] = useState(() => createBrowserSupabaseClient());
  // const auth = supabase.auth;
  // const [post, setPost] = useState<social_booking[]>([]);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await fetch("/api/posts");
  //     const posts = await data.json();
  //     console.log(posts);
  //     return posts;
  //   };
  //   fetchPosts().then((response) => setPost(response));
  // }, []);
  // const signUp = () => {
  //   auth
  //     .signUp({
  //       email: "damon.pengyu.chen@gmail.com",
  //       password: "112123123",
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const signIn = () => {
  //   auth
  //     .signInWithPassword({
  //       email: "damon.pengyu.chen@gmail.com",
  //       password: "112123123",
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const signOut = () => {
  //   auth
  //     .signOut()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  // await supabase.auth.signInWithPassword({
  //   email: "damon.pengyu.chen@gmail.com",
  //   password: "112123123",
  // });
  // const user = await supabase.auth.getUser();
  return <main></main>;
}
