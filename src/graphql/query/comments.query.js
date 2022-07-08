import { gql } from '@apollo/client';

export const GET_BY_TARGET_ID = gql`
  query Query($type: Int!, $id: ObjectID!) {
    getByTargetId(type: $type, id: $id) {
      _id
      parent {
        _id
      }
      child {
        _id
        sender {
          _id
          first_name
          last_name
          profil_picture
        }
        content {
          message
        }
        created_at
      }
      sender {
        _id
        first_name
        last_name
        profil_picture
      }
      content {
        message
      }
      created_at
    }
  }
`;

export const GET_SIGNALMENTS = gql`
  query Query {
    comments {
      signalments {
        _id
        name
      }
    }
  }
`;
