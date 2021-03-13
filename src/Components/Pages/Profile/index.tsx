import React, { FC, ReactElement } from "react";
import { Card, Image } from "semantic-ui-react";
import { User } from "Types";

interface Props {
  user : User
}

const Profile : FC<Props> = (props) : ReactElement => {
  return <Card>
    <Image src={props.user.picture} wrapped ui={false}/>
    <Card.Content>
      <Card.Header>Welcome {props.user.name}</Card.Header>
    </Card.Content>
  </Card>;
};

export { Profile };
