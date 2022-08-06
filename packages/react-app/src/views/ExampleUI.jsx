import React from "react";
import { RECOMEND_PROFILES, GET_FK } from "../hooks/api.js";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

export default function ExampleUI() {
  //Work w API to get recommended profiles
  const useMultiple = () => {
    const get_fk = useQuery(GET_FK);
    const recProfiles = useQuery(RECOMEND_PROFILES);
    //setRecommendedProfiles({ data });
    return [get_fk, recProfiles];
  };

  const [{ loading: loading1, error: error1, data: data1 }, { loading: loading2, error: error2, data: data2 }] =
    useMultiple();
  console.log("Data1", data1);
  console.log("Data2", data2);
  //Work w API to get recommended profiles

  const { loading, error, data } = useQuery(RECOMEND_PROFILES);
  //setRecommendedProfiles({ data });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div style={{ margin: 32 }}>
      {data.recommendedProfiles.map((profile, index) => (
        <Link key={index} to={`/profile/${profile.id}`}>
          <a href={`/profile/${profile.id}`}>
            <div
              style={{
                backgroundColor: "rgb(97, 255, 150)",
                display: "inline-block",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "42px",
                margin: "1.5%",
                overflow: "hidden",
                textAlign: "top center",
              }}
            >
              <p>Classifieds</p>
              {profile.picture ? (
                profile.picture.__typename === "NftImage" ? (
                  <img
                    alt="..."
                    style={{ width: "300px", height: "300px", borderRadius: "10px" }}
                    src={profile.picture.uri}
                  />
                ) : (
                  <img
                    alt="..."
                    style={{ width: "300px", height: "300px", borderRadius: "10px" }}
                    src={profile.picture.original.url}
                  />
                )
              ) : (
                <img
                  alt="..."
                  style={{ width: "300px", height: "300px", borderRadius: "10px" }}
                  src="https://lh3.googleusercontent.com/SnPeYEbN776UygTg05HUfamo4CTSAxMt1cvfsDEDT3NkPmZ5RIEX70B80hUHIqO66LIpepSe8u0yDZEdKZYKHEc2FdL5cLsrVYttZ_Q=w600"
                />
              )}
              <h4>
                {profile.handle}
                {/* <p style={{ inlineSize: '150px', overflowWrap: 'break-word', }}>{profile.bio}</p>
                 */}
                <br></br>
                <button style={{ display: "inline-block", margin: "10px" }}>Buy</button>
                <button>Sell</button>
              </h4>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
