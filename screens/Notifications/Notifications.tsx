import React from "react";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import NotificationDetail from "./NotificationDetail";
import { View } from "react-native";
import { gql } from "apollo-boost";
import constants from "../constants";

const ME = gql`
  {
    me {
      username
      posts {
        id
        comments {
          createdAt
          post {
            id
            files {
              id
              url
            }
          }
          user {
            username
            avatar
          }
        }
        likes {
          createdAt

          post {
            id
            files {
              id
              url
            }
          }
          user {
            username
            avatar
          }
        }
      }
    }
  }
`;

export default ({ navigation }) => {
  const { loading: userLoading, data: me } = useQuery(ME);

  function compare(a, b) {
    const date1 = a.createdAt;
    const date2 = b.createdAt;

    let comparison = 0;

    if (date1 < date2) {
      comparison = 1;
    } else if (date1 > date2) {
      comparison = -1;
    }
    return comparison;
  }

  const getTimeDiff = (postTime, now) => {
    if (postTime.getMonth() === now.getMonth()) {
      if (postTime.getDate() === now.getDate()) {
        if (postTime.getHours() === now.getHours()) {
          if (postTime.getMinutes() === now.getMinutes()) {
            return "Just now";
          } else {
            return now.getMinutes() - postTime.getMinutes() + "m";
          }
        } else {
          return `${now.getHours() - postTime.getHours()}h`;
        }
      } else {
        return now.getDate() - postTime.getDate() + "D";
      }
    } else {
      return now.getDate() - postTime.getDate() + 30 + " days ago";
    }
  };
  return (
    <View style={{ flex: 1, width: constants.width, height: constants.height }}>
      {userLoading ? (
        <Loader />
      ) : (
        me && (
          <NotificationDetail
            {...me}
            compare={compare}
            getTimeDiff={getTimeDiff}
            navigation={navigation}
          />
        )
      )}
    </View>
  );
};
