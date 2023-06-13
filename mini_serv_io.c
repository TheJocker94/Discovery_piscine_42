#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>
#include <netdb.h>
#include <sys/socket.h>
#include <sys/select.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <printf.h>

// int extract_message(char **buf, char **msg)
// {
// 	char	*newbuf;
// 	int	i;

// 	*msg = 0;
// 	if (*buf == 0)
// 		return (0);
// 	i = 0;
// 	while ((*buf)[i])
// 	{
// 		if ((*buf)[i] == '\n')
// 		{
// 			newbuf = calloc(1, sizeof(*newbuf) * (strlen(*buf + i + 1) + 1));
// 			if (newbuf == 0)
// 				return (-1);
// 			strcpy(newbuf, *buf + i + 1);
// 			*msg = *buf;
// 			(*msg)[i + 1] = 0;
// 			*buf = newbuf;
// 			return (1);
// 		}
// 		i++;
// 	}
// 	return (0);
// }

// char *str_join(char *buf, char *add)
// {
// 	char	*newbuf;
// 	int		len;

// 	if (buf == 0)
// 		len = 0;
// 	else
// 		len = strlen(buf);
// 	newbuf = malloc(sizeof(*newbuf) * (len + strlen(add) + 1));
// 	if (newbuf == 0)
// 		return (0);
// 	newbuf[0] = 0;
// 	if (buf != 0)
// 		strcat(newbuf, buf);
// 	free(buf);
// 	strcat(newbuf, add);
// 	return (newbuf);
// }
typedef struct s_client
{
    int fd;
    int id;
} t_client;
t_client clients[1024];
// memset(clients, -1, sizeof(clients));
fd_set mem_s, wr_s, rd_s;
int maxfd, id, s_sock;
char    mes[1000000], buf[1000000];

void ft_send_all(int id_not)
{
    for (int i = 0; i < id; i++)
    {
        if (clients[i].id != id_not && FD_ISSET(clients[i].fd, &wr_s))
            send(clients[i].fd, mes, strlen(mes), 0);
    }
    bzero(mes, sizeof(mes));
}

void ft_send_msg(int id_not)
{
    int i = 0;
    int j = 0;
    int len = strlen(buf);
    char    temp[1000000] = {0};
    while(i < len)
    {
        temp[j++] = buf[i];
        if (buf[i++] == '\n')
        {
            sprintf(mes + strlen(mes), "client %d: %s", id_not, temp);
            bzero(temp, sizeof(temp));
            j = 0;
        }
        ft_send_all(id_not);
    }
}

int main(int ac, char **av) {
    if (ac != 2)
    {
        write(2, "Wrong number of arguments\n", sizeof("Wrong number of arguments\n"));
        return (1);
    }
	struct sockaddr_in servaddr; 
	servaddr.sin_family = AF_INET; 
	servaddr.sin_addr.s_addr = htonl(2130706433); //127.0.0.1
	servaddr.sin_port = htons(atoi(av[1])); 

	// socket create and verification 
	// if ((s_sock = socket(AF_INET, SOCK_STREAM, 0)) < 0 ||
	// 	 bind(s_sock, (struct sockaddr*)&servaddr, sizeof(servaddr)) < 0 ||
	// 	 listen(s_sock, 128) < 0)
    if ((s_sock = socket(AF_INET, SOCK_STREAM, 0)) < 0 || bind(s_sock, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0 || listen(s_sock, 128) < 0)
    {
        write(2, "Fatal error\n", sizeof("Fatal error\n"));
    }
    maxfd = s_sock;
    FD_ZERO(&mem_s);
    FD_SET(s_sock, &mem_s);
    while (1)
    {
        wr_s = rd_s = mem_s;
        if (select(maxfd + 1, &rd_s, &wr_s, NULL, NULL) < 0)
            continue;
        if (FD_ISSET(s_sock, &rd_s))
        {
            int i = 0;
            while (clients[i].fd > 0 && i < 1024)
                i++;
            struct sockaddr_in clientaddr;
            socklen_t len;
            if ((clients[i].fd = accept(s_sock,(struct sockaddr *)&clientaddr, &len)) < 0)
                continue;
            FD_SET(clients[i].fd, &mem_s);
            clients[i].id = id++;
            if (clients[i].fd > maxfd)
                maxfd = clients[i].fd;
            sprintf(mes, "server: client %d just arrived\n", clients[i].id);
            ft_send_all(clients[i].id);
        }
        for (int i = 0; i < id ; i++)
        {
            if (clients[i].fd < s_sock || !FD_ISSET(clients[i].fd, &rd_s))
                continue;
            int rec = 1;
            bzero(buf, sizeof(buf));
            while (rec == 1)
            {
                rec = recv(clients[i].fd, buf + strlen(buf), 1, 0);
                if (buf[strlen(buf) - 1] == '\n')
                    break;
            }
            if (rec == 0)
            {
                sprintf(mes, "server: client %d just left\n", clients[i].id);
                ft_send_all(clients[i].id);
                close(clients[id].fd);
                FD_CLR(clients[i].fd, &mem_s);
                clients[i].fd = -1;
                clients[i].id = -1;
            }
            else if (rec)
            {
                ft_send_msg(clients[i].id);
            }
        }

    }
}