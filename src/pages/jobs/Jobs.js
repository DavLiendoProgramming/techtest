import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Loader from '../Loader';
export const Jobs = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'https://5f3f012c13a9640016a69302.mockapi.io/jobs'
      );
      setData({ data: response.data });
    };
    fetchData();
  }, []);
  return data === undefined || data === {} ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="content-wrap">
        <div className="jobs">
          {data.data.map((job) =>
            parseInt(job.id) > 10 ? (
              ''
            ) : (
              <div className="jobs__card" key={job.id}>
                <h3 className="jobs__card-company">{job.company}</h3>
                <img
                  src={job.image}
                  alt="Company Name"
                  className="jobs__card-image"
                />
                <h4 className="jobs__card-position">{job.jobPosition}</h4>
              </div>
            )
          )}
        </div>
      </div>
    </Fragment>
  );
};
