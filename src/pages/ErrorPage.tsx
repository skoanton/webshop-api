import { Button } from "@/components/ui/button";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

type ErrorPageProps = {};

const ErrorPage = ({}: ErrorPageProps) => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className=" h-screen flex flex-col gap-2 justify-center items-center">
        <h1 className="text-4xl">Oops!</h1>
        <h2 className="text-4xl">{error.status}</h2>
        <p className="text-4xl">{error.statusText}</p>
        <Link to="/">
          <Button variant="link">Go to HomePage</Button>
        </Link>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
};

export default ErrorPage;
