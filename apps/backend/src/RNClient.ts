import { Mneme } from './mneme.js';

type RNMessage = {
  event: string;
  payload: any;
};

type ClientProps = {
  channel: any;
  msg: RNMessage;
  backend: Mneme;
};

export enum SessionCommandEvents {
  isLoggedIn = 'org.mneme.session.command.isLoggedIn',
  login = 'org.mneme.session.command.login',
  logout = 'org.mneme.session.command.logout',
}

export enum SessionResultEvents {
  isLoggedIn = 'org.mneme.session.result.isLoggedIn',
  login = 'org.mneme.session.result.login',
  logout = 'org.mneme.session.result.logout',
}

function Session(props: ClientProps) {
  const { channel, msg, backend } = props;
  const { event, payload } = msg;

  if (event === SessionCommandEvents.isLoggedIn) {
    channel.send({
      event: SessionResultEvents.isLoggedIn,
      payload: backend.isLoggedIn(),
    });
  } else if (event === SessionCommandEvents.login) {
    const { email } = payload;

    backend.login(email).then((data: any) => {
      channel.send({ event: SessionResultEvents.login, payload: data });
    });
  } else if (event === SessionCommandEvents.logout) {
    backend.logout();
    channel.send({ event: SessionResultEvents.logout, payload: null });
  }
}

export function RNClient(props: { channel: any; userDataPath: string }) {
  const { channel, userDataPath } = props;
  const backend = new Mneme(false, userDataPath, true);

  channel.on('message', async (msg: any) => {
    Session({ channel, msg, backend });
  });
}
