import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
    // eslint-disable-next-line
  }, []);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [span, setSpan] = useState(8);
  useEffect(() => {
      if (width < 600) {
          setSpan(24);
      } else {
          setSpan(8);
      }
  }, [width]);
  return (
    <>
    <div>

    {user && (
      <div>
        <PageTitle title={`Hi ${(user?.name).charAt(0).toUpperCase() + (user?.name).slice(1)}, Welcome to WaleedQuiz`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]} className=''>
          {exams?.map((exam) => (
            <Col span={span} className='d-flex'>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-2xl">{exam?.name}</h1>

                <h1 className="text-md">Category : {exam?.category}</h1>

                <h1 className="text-md">Total Marks : {exam?.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam?.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam?.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam?._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )}
    </div>
    <div className="text-center footer">
      <h1 className="text-sm">&#169; Waleed Shaikh</h1>
    </div>
    </>
  );
}

export default Home;
