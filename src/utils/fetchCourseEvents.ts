export const fetchCourseEvents = async () => {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  try {
    const response = await fetch(
      `https://4202.insight.thirdweb.com/v1/${clientId}/events/${contractAddress}/CourseListed(string,string,string,address,uint16,uint256,uint256,uint256)?limit=5`
    );
    const courses = await response.json();
    console.log("Fetched Course Data:", courses);
    return courses;
  } catch (error) {
    console.log("Error fetching courses:", error);
    return null;
  }
};
