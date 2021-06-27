import { useState } from "react";
import Comment from "./Thread/Comment";
import { report, Service as ApiService, Service } from "../api";
import {
  Button,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Paper,
} from "@material-ui/core";
import { Block as BlockIcon, Check as CheckIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      marginLeft: "10px",
    },
    report: {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      maxWidth: "700px",
    },
  })
);

function handleBan(r: report) {
  Service.handleReport(r.id, "ban");
}

function handleIgnore(r: report) {
  Service.handleReport(r.id, "ignore");
}

function ReportsView() {
  const [getReports, setReports] = useState<report[]>([
    {
      id: 1,
      comment: {
        id: 1,
        threadId: 100,
        parentId: 0,
        content:
          "Testerhfsdgghbfsgfsidgfdhgfdsgfgsgsdgdgsdssdgdgsgdfkahevhgfghahgdakgkhdgfghfkhdagfg",
        upvotes: 5,
        downvotes: 5,
      },
      reason: "reason",
    },
  ]);

  ApiService.getReports().then((reports) => {
    if (reports.length > 0) {
      setReports(reports);
    }
  });

  const classes = useStyles();

  return (
    <div>
      {getReports.map((r) => {
        return (
          <Paper className={classes.report}>
            <Comment
              comment={r.comment}
              selectCallback={(id) => {}}
              reportCallback={(id) => {}}
              voteButtons={false}
            ></Comment>
            <div className={classes.root}>
              <Typography variant="body1">{r.reason}</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                onClick={() => {
                  handleBan(r);
                }}
              >
                Ban user
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<BlockIcon />}
                onClick={() => {
                  handleIgnore(r);
                }}
              >
                Dismiss
              </Button>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}

export default ReportsView;
