import React, { useState ,useEffect} from 'react'
import UserSidebar from '../components/UserSideBar';
import BookmarkTemplate from "../components/BookmarkTemplate"
import {getBookmarkJobsService} from "../service/service"
const UserBookmarks = () => {
  const [data,setData] = useState(null);

  const fetchData = async () => {
    const result = await getBookmarkJobsService();

    if (!result) {
      console.log("Error in getting result");
    } else {
      setData(result.jobs);
    }
    console.log(result);
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function inside useEffect
  }, []);
  


  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <UserSidebar />
      <div style={{ marginLeft: "20px", flexGrow: 1 }}>
        <BookmarkTemplate title={"Bookmarked Jobs"} data={data} />
      </div>
    </div>
  );
}

export default UserBookmarks
