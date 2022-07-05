import { gql } from "@apollo/client";

export const GET_UPCOMING_EVENTS = gql`
  query Query($input: complexQueryInput) {
    eventsComplexQuery(input: $input) {
      results {
        content {
          title
        }
        content_media {
          photo_main_url
        }
        price {
          adult
        }
        event_date {
          start
        }
        adress {
          city
        }
        categories {
          name
        }
      }
      count
    }
  }
`;

export const GET_LAST_PUBLISHED_EVENTS = gql`
  query Query($input: complexQueryInput) {
    eventsComplexQuery(input: $input) {
      results {
        content {
          title
        }
        content_media {
          photo_main_url
        }
        price {
          adult
        }
        event_date {
          start
        }
        adress {
          city
        }
        categories {
          name
        }
      }
      count
    }
  }
`;

export const GET_SIGNALMENTS = gql`
  query Query {
    events {
      signalments {
        _id
        name
      }
    }
  }
`;
export const GET_EVENTS_CATEGORY = gql`
  query EventsComplexQuery(
    $first: Int
    $offset: Int
    $status: String
    $minDate: NonNegativeInt
    $dateOrder: String
    $minChildAge: Int
    $maxChildAge: Int
    $lng: Longitude
    $lat: Latitude
    $maxDistMeters: Int
    $restrictionsArray: [ObjectID]
    $searchInput: String
    $categories: ObjectID
  ) {
    eventsComplexQuery(
      first: $first
      offset: $offset
      status: $status
      minDate: $minDate
      dateOrder: $dateOrder
      minChildAge: $minChildAge
      maxChildAge: $maxChildAge
      lng: $lng
      lat: $lat
      maxDistMeters: $maxDistMeters
      restrictionsArray: $restrictionsArray
      searchInput: $searchInput
      categories: $categories
    ) {
      results {
        _id
        content {
          title
          subtitle
        }
        content_media {
          photo_main_url
        }
        price {
          adult
        }
        event_date {
          start
        }
        adress {
          city
          zip_code
        }
        categories {
          name
        }
        highlighted
      }
      count
    }
  }
`;
