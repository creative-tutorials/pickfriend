import { useEffect } from "react";
const TestingPost = () => {
  useEffect(() => {
    return () => {
      LoadPageContent();
    };
  }, []);

  const LoadPageContent = () => {
    if (window.location.pathname === "/components/client/testpost") { // if the url is localhost:3000
      console.log("Loaded TestingPost");
    }
  } 

  return (
    <div className="loading">
      <span>
        <i className="fas fa-spinner fa-pulse"></i>
        Loading...
      </span>
    </div>
  );
};
export default TestingPost;
