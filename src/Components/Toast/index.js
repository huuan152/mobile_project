import { useToast } from "react-native-styled-toast";

export default function NotifyMessage(message) {
  const { toast } = useToast();
  toast({ message });
}
