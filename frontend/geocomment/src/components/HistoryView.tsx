import React from "react";
import { useState } from "react";
import { Service } from "../api";
import { comment } from "../api/models/comment";
import ThreadComment from "./Thread/Comment";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thread: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      maxWidth: "1000px",
    },
  })
);

function HistoryView() {
  const classes = useStyles();

  const [selectedCommentId, setCommentId] = useState(0);
  const [reportCommentId, setReportId] = useState(0);
  const [getFile, setFile] = useState();
  const [openReport, setOpenReport] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      threadId: 100,
      parentId: 0,
      content:
        "Testerhfsdgghbfsgfsidgfdhgfdsgfgsgsdgdgsdssdgdgsgdfkahevhgfghahgdakgkhdgfghfkhdagfg",
      upvotes: 5,
      downvotes: 5,
    },
    {
      id: 2,
      threadId: 100,
      parentId: 1,
      content: "dfsah[img:http://http.cat/201]",
      upvotes: 5,
      downvotes: 5,
    },
    {
      id: 3,
      threadId: 100,
      parentId: 1,
      content: "dfsah[img:http://http.cat/202]",
      upvotes: 5,
      downvotes: 5,
    },
    {
      id: 4,
      threadId: 2,
      parentId: 0,
      content: "dfsah[img:http://http.cat/203]",
      upvotes: 5,
      downvotes: 5,
    },
    {
      id: 5,
      threadId: 100,
      parentId: 3,
      content: "dfsah[img:http://http.cat/204]",
      upvotes: 5,
      downvotes: 5,
    },
  ] as comment[]);
  Service.getThreadsAt(1, 1, Number.MAX_VALUE).then((threads) => {
    var promises: Promise<comment[]>[] = [];
    threads.forEach((t) => {
      promises.push(Service.getThreadComments(t.id));
    });
    Promise.all(promises).then((resp) => {
      setComments(
        resp.flatMap((e) => {
          return e;
        })
      );
    });
  });

  function renderComments(cs: comment[], comment: comment): any {
    var children = cs.filter(
      (c) => c.parentId === comment.id && c.threadId === comment.threadId
    );
    return (
      <div>
        <ThreadComment
          comment={comment}
          selectCallback={(id: number) => {
            setCommentId(id);
          }}
          reportCallback={(id: number) => {
            setReportId(id);
            setOpenReport(true);
          }}
          selected={comment.id === selectedCommentId}
        />
        <Grid style={{ marginLeft: "50px" }}>
          {children.map((child2) => {
            return renderComments(cs, child2);
          })}
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {comments
        .filter((c) => {
          return c.parentId === 0;
        })
        .map((c) => {
          return (
            <Paper className={classes.thread}>
              <Typography variant="h4">Thread {c.threadId}</Typography>
              {renderComments(comments, c)}
            </Paper>
          );
        })}
    </div>
  );
}

export default HistoryView;
