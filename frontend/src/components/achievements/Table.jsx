import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useGetAllAchievementsQuery } from "../../services/api/api";
import { StudentjwtDecodeFunction } from "../../services/jwtDecoder";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateLogo from "../../assets/certificate-logo.png";

const AchievementsTable = ({ searchValue }) => {
  console.log(searchValue);

  const [data, setData] = useState([]);
  const studentId = StudentjwtDecodeFunction()?.findUser?._id;
  const { data: queryData, refetch } = useGetAllAchievementsQuery(studentId);

  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  const certificateRef = useRef(null);
  const [isHidden, setIsHidden] = useState(true);

  // const downloadCertificate = async () => {
  //   const input = certificateRef.current;

  //   try {
  //     const canvas = await html2canvas(input, {
  //       scale: 2,
  //       useCORS: true, // Handle cross-origin images
  //       allowTaint: false, // Prevent tainted canvases when images are from other domains
  //       width: input.scrollWidth,
  //       height: input.scrollHeight,
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF({
  //       orientation: "landscape",
  //       unit: "px",
  //       format: [canvas.width, canvas.height],
  //     });

  //     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  //     pdf.save("Certificate.pdf");
  //     setIsHidden(true);
  //   } catch (error) {
  //     console.error("Error generating certificate: ", error);
  //   }
  // };

  const downloadCertificate = async () => {
    const input = certificateRef.current;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true, // Handle cross-origin images
        allowTaint: false, // Prevent tainted canvases when images are from other domains
        width: input.scrollWidth,
        height: input.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Create a blob URL
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open PDF in a new tab
      window.open(pdfUrl, "_blank");

      // Optionally, revoke the URL object after some time
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 2000);

      setIsHidden(true);
    } catch (error) {
      console.error("Error generating certificate: ", error);
    }
  };

  return (
    <div
      className={`font-roboto w-[100%] h-[100%] flex flex-col overflow-y-auto`}
    >
      {data && data.length > 0 ? (
        <div className="w-full  bg-white flex flex-wrap">
          {data.map((item, index) => (
            <div
              onClick={downloadCertificate}
              key={index}
              className="cursor-pointer relative w-[30%] mb-10 mr-10 h-[35vh] text-white bg-cover bg-center overflow-hidden"
              // style={{ backgroundImage: `url(${item?.coverImage})` }}
            >
              <div className="absolute inset-0 bg-gray-600 opacity-50 text-center flex items-center justify-center mt-10">
              Download Certificate
              </div>
              <div className="absolute bottom-0">
                <div className="relative z-10 px-4 py-1 font-bold">
                  Hackathon : {item?.hackathon?.title}
                </div>
                <div className="relative z-10 px-4 py-1 ">
                  Obtained Marks : {item?.obtainedMarks}
                </div>
              </div>

              <div
                className="flex justify-center text-center text-black"
                ref={certificateRef}
              >
                <div className=" border-blue-600 border-solid border-[26px] rounded-md px-4 py-8 w-[100%] my-4">
                  <div className="w-[100%] flex justify-center my-12 text-2xl font-extrabold text-blue-500">
                    {" "}
                    Code With Ease
                    {/* <img src={CertificateLogo} alt="" className="h-[100px]" /> */}
                  </div>
                  <h1 className="text-xl font-semibold">
                    Certificate of Completion
                  </h1>
                  <p className="text-md my-4">Present To</p>
                  <h1 className="text-xl font-bold my-4">
                    {item?.student?.firstname + " " + item?.student?.lastname}
                  </h1>
                  <p className="text-sm">
                    For successfully completed the {item?.hackathon?.title}{" "}
                    course
                  </p>
                  {/* <div className="flex justify-center my-8 ">
                    <div className="px-[70px]">
                      <div className="border-b-gray-400 border-solid border-b-4 my-2">
                        {item?.obtainedMarks}
                      </div>
                      <div className="text-sm px-5 font-semibold">
                        Obtained Marks
                      </div>
                    </div>
                    <div className="px-[70px]">
                      <div className="border-b-gray-400 border-solid border-b-4 my-4">
                        100
                      </div>
                      <div className="text-sm px-3 font-semibold">
                        Total Marks
                      </div>
                    </div>
                    <div className="px-[70px]">
                      <div className="border-b-gray-400 border-solid border-b-4 my-4 px-5">
                        {hackathonData?.judge?.firstname +
                          " " +
                          hackathonData?.judge?.lastname}
                      </div>
                      <div className="text-sm px-3 font-semibold">Judge</div>
                    </div>
                  </div> */}
                  <div className="mt-6">
                    <p>Authorized</p>
                  </div>
                </div>
              </div>
              <div className="bg-white text-black py-4">
                Download Certificate
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className=" text-center mt-5 text-lg">No Achievements Found</h1>
      )}
    </div>
  );
};

export default AchievementsTable;


