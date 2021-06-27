import React from "react";
import { thread } from "../../api";
import {
  Paper,
  Typography,
  Grid,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { green, grey, red, yellow } from "@material-ui/core/colors";
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
  })
);

function ThreadInfo(state: {
  thread: thread;
  selectCallback: (id: number) => void;
  reportCallback: (id: number) => void;
  selected?: boolean;
}) {
  const classes = useStyles();
  const comment = {
    id: 0,
    threadId: state.thread.id,
    parentId: 0,
    content: state.thread.title + " " + state.thread.description,
    upvotes: 0,
    downvotes: 0,
  };

  var reg = new RegExp(/(.*)\[img:(.*)\](.*)/g);
  var res: RegExpExecArray | null = reg.exec(state.thread.description);
  return (
    <Paper
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "7px",
      }}
    >
      <Typography
        variant="h4"
        style={{ padding: "5px", wordWrap: "break-word" }}
      >
        {state.thread.title}
      </Typography>
      <Typography
        variant="body1"
        style={{ padding: "5px", wordWrap: "break-word" }}
      >
        {res != null ? res[1] : ""}
        {res != null ? res[3] : state.thread.description}
      </Typography>
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

      <Grid container>
        <Grid item xs={2} />
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <VoteButtons
            comment={comment}
            selectCallback={(id: number) => {
              state.selectCallback(0);
            }}
            reportCallback={(id: number) => {
              state.reportCallback(0);
            }}
            selected={state.selected}
          />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Paper>
  );
}

export default ThreadInfo;
