import React, { useEffect, useState } from "react";
import Button from "../../dynamic/button/Button";
import { colors } from "../../../constant/color";
import ParticiapatePopup from "./ParticiapatePopup";
import { StudentjwtDecodeFunction } from "../../../services/jwtDecoder";
import Dropzone from "react-dropzone-uploader";
import { useUploadFileSubmissionMutation } from "../../../services/api/api";
import { ToastContainer, toast } from "react-toastify";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateLogo from "../../../assets/certificate-logo.png";

const SingleHackathon = ({ hackathonData, refetch }) => {
  const studentId = StudentjwtDecodeFunction()?.findUser?._id;
  const [closePopup, setClosePopup] = useState(false);
  const [hackthon, setHackthon] = useState(null);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const calculateRemainingTime = (startDate, endDate) => {
    const currentDate = new Date();
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    if (currentDate > startDateTime) {
      const timeDifference = endDateTime - currentDate;

      if (timeDifference > 0) {
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        return {
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        };
      } else {
        return null; // Time has expired
      }
    } else {
      return null; // Current time is before the start time
    }
  };

  const formattedStartDate = formatDateTime(hackathonData?.startingDate);
  const formattedEndDate = formatDateTime(hackathonData?.endingDate);
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(
      hackathonData?.startingDate,
      hackathonData?.endingDate
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(
        calculateRemainingTime(
          hackathonData?.startingDate,
          hackathonData?.endingDate
        )
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hackathonData?.startingDate, hackathonData?.endingDate]);

  const [submissionFile, setSubmissionFile] = useState(null);

  // const remainingTime = calculateRemainingTime(hackathonData?.startingDate);
  // const endingTime = calculateRemainingTime(hackathonData?.endingDate);

  const handleAdd = ({ file }, status) => {
    if (status === "done") {
      setSubmissionFile(file);
    } else if (status === "removed") {
      setSubmissionFile(null);
    }
  };

  const [uploadFileSubmission] = useUploadFileSubmissionMutation(); // Define the mutation hook outside
  const [loader, setLoader] = useState(false);
  const uploadSubmission = async () => {
    if (!submissionFile) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("submissionFile", submissionFile);
    setLoader(true);
    try {
      const result = await uploadFileSubmission({
        data: formData,
        id: hackathonData?._id,
      }).unwrap();
      console.log(result);
      toast.success("file has been submitted");
      refetch(); // Uncomment if you need to refetch after updating
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

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
    <div className=" font-popins mt-10 ml-5 mr-5 pb-10">
      {/* HACKATHON COVER IMAGE  */}
      <div>
        <img
          className="w-screen h-[28rem] bg-center rounded-md bg-cover"
          src={
            hackathonData?.coverImage ||
            "https://c4.wallpaperflare.com/wallpaper/632/34/549/technology-monitor-alpha-coders-binary-wallpaper-preview.jpg"
          }
          alt=""
        />
      </div>

      {/* TITLE AND DESCRIPTION  */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">{hackathonData?.title}</h1>
          {hackathonData?.isResultUploaded ? (
            <Button
              onClickFunc={() => {}}
              btnValue={"Completed"}
              style={{ backgroundColor: colors?.sky_blue, opacity: "0.5" }}
              className={
                "text-white w-[5rem] h-[1.8rem] sm:w-[6rem] sm:h-[2rem] text-xs md:w-[9rem] md:h-[2.5rem] md:text-base font-roboto rounded-3xl shadow-btnShdow1"
              }
            />
          ) : new Date().getTime() >
            new Date(hackathonData?.endingDate).getTime() ? (
            <Button
              onClickFunc={() => {}}
              btnValue={"Ended"}
              style={{ backgroundColor: colors?.sky_blue, opacity: "0.5" }}
              className={
                "text-white w-[5rem] h-[1.8rem] sm:w-[6rem] sm:h-[2rem] text-xs md:w-[9rem] md:h-[2.5rem] md:text-base font-roboto rounded-3xl shadow-btnShdow1"
              }
            />
          ) : hackathonData?.participant.find(
              (item) => item._id == studentId
            ) ? (
            <Button
              onClickFunc={() => {}}
              btnValue={"Enrolled"}
              style={{ backgroundColor: colors?.sky_blue, opacity: "0.5" }}
              className={
                "text-white w-[5rem] h-[1.8rem] sm:w-[6rem] sm:h-[2rem] text-xs md:w-[9rem] md:h-[2.5rem] md:text-base font-roboto rounded-3xl shadow-btnShdow1"
              }
            />
          ) : (
            <Button
              onClickFunc={() => {
                setHackthon(hackathonData);
                setClosePopup(true);
              }}
              btnValue={"Enroll Now"}
              style={{ backgroundColor: colors?.sky_blue }}
              className={
                "text-white w-[5rem] h-[1.8rem] sm:w-[6rem] sm:h-[2rem] text-xs md:w-[9rem] md:h-[2.5rem] md:text-base font-roboto rounded-3xl shadow-btnShdow1"
              }
            />
          )}
        </div>

        <div className="sm:flex justify-between items-center mt-5">
          <p className="flex gap-x-1 sm:mb-0 mb-2 items-center text-base sm:text-sm text-gray-800 ">
            Starting Date:
            <span className="text-black">{formattedStartDate}</span>
          </p>

          <p className="flex gap-x-1 items-center text-base sm:text-sm ">
            Ending Date:
            <span className="text-black">{formattedEndDate}</span>
          </p>
        </div>
        <p className="mt-3 text-[#6b7483] text-sm leading-6">
          {hackathonData?.description}
        </p>
        <p className="mt-3 text-[#6b7483] text-sm leading-6">
          Fees: {hackathonData?.fees}
        </p>
        {remainingTime && (
          <div className="font-popins mt-2 sm:mb-0 mb-2">
            <p className="flex gap-x-1 items-center text-sm text-gray-800">
              Duration:
              <span className=" text-blue-500">
                {`${remainingTime.hours}:${remainingTime.minutes
                  .toString()
                  .padStart(2, "0")}:${remainingTime.seconds
                  .toString()
                  .padStart(2, "0")}`}{" "}
                remaining
              </span>{" "}
            </p>
          </div>
        )}

        <div className="w-[50%] flex">
          {hackathonData?.questionImage !== null &&
            hackathonData?.participant.filter(
              (item) => item._id === studentId
            ) && (
              <button className="p-2 w-[48%] mr-4 flex bg-[blue] text-white text-center justify-center mt-4 rounded">
                <a href={hackathonData?.questionImage}>
                  Download Question Paper
                </a>
              </button>
            )}
          {hackathonData?.submissions?.find(
            (item) => item?.student?._id == studentId
          ) && (
            <button className="p-2 w-[48%] flex bg-[blue] text-white text-center justify-center mt-4 rounded">
              <a
                href={
                  hackathonData?.submissions?.find(
                    (item) => item?.student?._id == studentId
                  )?.submissionFileUrl
                }
              >
                Download Submission File
              </a>
            </button>
          )}
        </div>
        {hackathonData?.questionImage !== null && (
          <div className="h-[30px] mt-4 mb-10">
            {!hackathonData?.isResultUploaded &&
            hackathonData?.submissions?.find(
              (item) => item?.student?._id == studentId
            ) ? (
              <div> Result is Pending</div>
            ) : !hackathonData?.isResultUploaded &&
              !hackathonData?.submissions?.find(
                (item) => item?.student?._id == studentId
              ) ? (
              !hackathonData?.isResultUploaded &&
              hackathonData?.participant.find(
                (item) => item._id == studentId
              ) &&
              new Date().getTime() <
                new Date(hackathonData?.endingDate).getTime() &&
              new Date().getTime() >
                new Date(hackathonData?.startingDate).getTime() && (
                <div className="mb-[100px]">
                  <Dropzone
                    onChangeStatus={handleAdd}
                    accept="image/*,application/pdf"
                    maxFiles={1}
                    inputContent="Drop files here or click to upload."
                    styles={{
                      dropzone: {
                        backgroundColor: "#f3f4f6", // Tailwind's bg-gray-100
                        borderRadius: "0.375rem", // Tailwind's rounded-md
                        border: "2px dashed #3b82f6", // Tailwind's border-2 border-blue-500
                        padding: "1rem", // Tailwind's p-4
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "80px", // Custom height if needed
                        minWidth: "350px",
                        position: "relative", // Position relative for overlay
                      },
                      inputLabel: {
                        color: "#3b82f6", // Tailwind's text-blue-500
                        fontSize: "1rem", // Tailwind's text-base
                        textAlign: "center",
                      },
                      preview: {
                        position: "relative",
                      },
                      previewImage: {
                        borderRadius: "0.375rem", // Tailwind's rounded-md
                      },
                      previewContainer: {
                        position: "relative",
                      },
                      previewIconContainer: {
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                        cursor: "pointer",
                        zIndex: 10,
                      },
                      previewIcon: {
                        color: "#ffffff",
                        fontSize: "1rem",
                      },
                    }}
                  />
                  <button
                    onClick={uploadSubmission}
                    className="p-2 w-[100%] flex bg-[blue] text-white text-center justify-center mt-4"
                  >
                    {loader ? "Loading..." : "Upload"}
                  </button>
                </div>
              )
            ) : (
              <div>
                {" "}
                Your Obtained marks are :{" "}
                {
                  hackathonData?.results?.find(
                    (item) => item?.student?._id == studentId
                  )?.obtainedMarks
                }
                {hackathonData?.results?.find(
                  (item) => item?.student?._id == studentId
                )?.obtainedMarks >= 50 && (
                  <button
                    onClick={() => {
                      setIsHidden(false);
                      setTimeout(() => {
                        downloadCertificate();
                      }, 700);
                    }}
                    className="p-2 w-[20%] flex bg-[blue] text-white text-center justify-center mt-4 mb-32 rounded-md"
                  >
                    Generate Certificate
                  </button>
                )}
                <div className={`${isHidden ? "hidden" : ""} mt-[960px]`}>
                  <div
                    className="flex justify-center text-center "
                    ref={certificateRef}
                  >
                    <div className=" border-blue-600 border-solid border-[26px] rounded-md px-4 py-8 w-[100%] my-4">
                      {/* Design your certificate here */}
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
                        {hackathonData?.results?.find(
                          (item) => item?.student?._id == studentId
                        )?.student?.firstname +
                          " " +
                          hackathonData?.results?.find(
                            (item) => item?.student?._id == studentId
                          )?.student?.lastname}
                      </h1>
                      <p className="text-sm">
                        For successfully completed the {hackathonData?.title}{" "}
                        course
                      </p>
                      {/* <div className="flex justify-center my-8 ">
                        <div className="px-[70px]">
                          <div className="border-b-gray-400 border-solid border-b-4 my-2">
                            {
                              hackathonData?.results?.find(
                                (item) => item?.student?._id == studentId
                              )?.obtainedMarks
                            }
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
                          <div className="text-sm px-3 font-semibold">
                            Judge
                          </div>
                        </div>
                      </div> */}
                      <div className="mt-6">
                        <p>Authorized</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {closePopup && (
        <div className="absolute top-0 left-0 w-screen h-[100%] bg-black bg-opacity-50">
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <ParticiapatePopup
              setClosePop={setClosePopup}
              hackthon={hackthon}
              refetch={refetch}
            />
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SingleHackathon;
