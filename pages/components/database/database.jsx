import { useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rpxjnjvvpivqhzbhldtm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweGpuanZ2cGl2cWh6YmhsZHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc2MzMzODYsImV4cCI6MTk3MzIwOTM4Nn0.DfGKY6zFci18sDb_i1zX0Os7_X-wUzZSJUcVRBXB9y4"
);

const DatabApp = () => {
  const unitlist = useRef();

  useEffect(() => {
    return () => {
      checkDatab();
    };
  }, []);

  const checkDatab = async () => {
    const listItems = unitlist.current;
    const createlist = document.createElement("li");
    const { data, error } = await supabase.from("foods").select("*");
    listItems.appendChild(createlist);
    console.log(data);
    createlist.innerHTML += `
    <div class="card">
        <div class="list">${data[0].items}</div>
        <div class="list">${data[1].items}</div>
        <div class="list">${data[2].items}</div>
        <div class="list">${data[3].items}</div>
    </div>
    `;
  };
  return (
    <div className="app">
      <h1>Database App</h1>
      <p>
        This is a simple app that uses the supabase client to interact with a
        database.
      </p>
      <p>
        The database is a simple example of a database that is used to store
        images.
      </p>
      <h2>Items Retireved From Database</h2>
      <ul ref={unitlist}>
        <li></li>
      </ul>
      <div className="footer">
        <p>
            This is a demo of a database app that uses the supabase client to
            interact with a database.
            Planning to do more with it on this app soon.
        </p>
      </div>
    </div>
  );
};
export default DatabApp;
