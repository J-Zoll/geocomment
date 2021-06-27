import ThreadComment from "./Thread/Comment";
import ThreadInfo from "./Thread/ThreadInfo";
import WriteComment from "./Thread/WriteComment";
import { Container } from "@material-ui/core";
import { Service as ServiceApi } from "../api/services/Service";
import { thread } from "../api/models/thread";
import { useState } from "react";
import { comment } from "../api";
import { Grid, AppBar } from "@material-ui/core";
import ReportDialog from "./Thread/ReportDialog";

async function onMessageSubmit(
  msg: string,
  anon: boolean,
  threadId: number,
  commentId: number,
  file: any
): Promise<boolean> {
  if (file !== null) {
    var formdata = new FormData();
    formdata.append("threadId", threadId.toString());
    formdata.append("commentId", commentId.toString());
    formdata.append("image", file, file.name);
    var resp = await ServiceApi.uploadImage(formdata);
    msg += "[img:" + resp.url + "]";
  }
  ServiceApi.postComment(threadId, {
    threadId: threadId,
    parentId: commentId,
    anonymous: anon,
    content: msg,
  });
  return new Promise<boolean>(() => {
    return false;
  });
}

const DEFAULT_LEVELS = 3;

function sendReport(reason: string, commentId: number, threadId: number) {
  ServiceApi.reportComment(threadId, commentId, {
    comment: {
      id: commentId,
      threadId: threadId,
      parentId: 0,
      content: "",
      upvotes: 5,
      downvotes: 5,
    },
    reason: reason,
  });
}

function ThreadView(state: { thread: thread }) {
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
      threadId: 100,
      parentId: 2,
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

  ServiceApi.getThreadComments(state.thread.id, DEFAULT_LEVELS).then((cs) => {
    setComments(cs);
  });

  function renderComments(cs: comment[], comment: comment): any {
    var children = cs.filter((c) => c.parentId === comment.id);
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
      <ThreadInfo
        thread={state.thread}
        selectCallback={(id: number) => {
          setCommentId(id);
        }}
        reportCallback={(id: number) => {
          setReportId(id);
          setOpenReport(true);
        }}
        selected={selectedCommentId === 0}
      />
      <div>
        {comments
          .filter((c) => c.parentId === 0)
          .map((c) => {
            return renderComments(comments, c);
          })}
        <div style={{ paddingTop: "50px" }}></div>
      </div>
      <Container fixed>
        <AppBar position="fixed" style={{ bottom: "0", top: "auto" }}>
          <WriteComment
            submit={(msg, anon, file) => {
              console.log(msg, file);
              return onMessageSubmit(
                msg,
                anon,
                state.thread.id,
                selectedCommentId,
                getFile === undefined ? null : getFile
              );
            }}
          />
        </AppBar>
        {openReport && (
          <ReportDialog
            open={openReport}
            callback={(r) => {
              sendReport(r, reportCommentId, state.thread.id);
              setOpenReport(false);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default ThreadView;
