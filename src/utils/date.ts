export const toDateTime = (timestamp?: number): string =>
    timestamp
        ? new Date(timestamp).toLocaleString("nl-NL", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
          })
        : "-";
