import React from "react";
import Card from "@material-ui/core/Card";
import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { green, grey, red, yellow } from "@material-ui/core/colors";
import { comment } from "../../api";
import VoteButtons from "./VoteButtons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    secondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
    primary: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    green: {
      backgroundColor: grey[900],
      color: green[500],
    },
    red: {
      backgroundColor: grey[900],
      color: red[500],
    },
    yellow: {
      backgroundColor: grey[900],
      color: yellow[500],
    },
    grey: {
      backgroundColor: grey[900],
      color: grey[100],
    },
    selected: {},
  })
);

function ThreadComment(state: {
  comment: comment;
  selectCallback: (id: number) => void;
  reportCallback: (id: number) => void;
  selected?: boolean;
  voteButtons?: boolean;
}) {
  const classes = useStyles();

  var reg = new RegExp(/(.*)\[img:(.*)\](.*)/g);
  var res: RegExpExecArray | null = reg.exec(state.comment.content);

  return (
    <Card
      style={{
        width: "900px",
        maxWidth: "90%",
        padding: "10px",
        margin: "15px",
      }}
      className={classes.primary}
    >
      <Grid container direction="row">
        <Grid
          item
          xs={2}
          style={{
            flexDirection: "column",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Avatar className={classes.secondary}>{state.comment.upvotes}</Avatar>
          <Avatar className={classes.red}>{state.comment.downvotes}</Avatar>
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            flexDirection: "column",
            justifyContent: "center",
            display: "flex",
            padding: "5px",
            paddingLeft: "10px",
          }}
        >
          {res != null ? (
            <img
              src={res[2]}
              alt="imagePath"
              width="250px"
              height="250px"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                objectFit: "cover",
                paddingBottom: "20px",
              }}
            ></img>
          ) : (
            <p></p>
          )}
          <Typography variant="body1" style={{ wordWrap: "break-word" }}>
            {res != null ? res[1] : ""}
            {res != null ? res[3] : state.comment.content}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {state.voteButtons !== false && (
            <VoteButtons
              comment={state.comment}
              reportCallback={state.reportCallback}
              selectCallback={state.selectCallback}
              selected={state.selected}
            />
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default ThreadComment;
