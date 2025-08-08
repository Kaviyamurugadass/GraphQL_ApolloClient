import { gql } from "@apollo/client";

export const  SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $sender: String!) {
    sendMessage(content: $content, sender: $sender) {
      id
      content
      sender
    }
  }
`;

export default SEND_MESSAGE;