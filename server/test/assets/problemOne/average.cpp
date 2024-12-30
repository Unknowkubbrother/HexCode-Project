#include <iostream>
#include <cstdio>

#define V 100
#define INF 999999

using namespace std;

void floyd(int graph[][V]);
float average(int graph[][V]);
int main()
{
    // 1 2 2 4 1 3 3 1 4 3 0 0
    int startNode = -1, endNode = -1;
    int graph[V][V];

    for (int i = 0; i < V; i++)
    {
        for (int j = 0; j < V; j++)
        {
            graph[i][j] = 0;
        }
    }

    while (startNode != 0 && endNode != 0)
    {
        cin >> startNode >> endNode;

        graph[startNode - 1][endNode - 1] = 1;
    }

    floyd(graph);
    return 0;
}

void floyd(int graph[][V])
{
    int dist[V][V];
    int i = 0, j = 0;

    // initial
    for (i = 0; i < V; i++)
    {
        for (j = 0; j < V; j++)
        {
            if (i == j)
            {
                dist[i][j] = 0;
                continue;
            }

            if (graph[i][j] == 0)
            {
                dist[i][j] = INF;
            }
            else
            {
                dist[i][j] = graph[i][j];
            }
        }
    }

    int k = 0;
    for (k = 0; k < V; k++)
    {
        for (i = 0; i < V; i++)
        {
            for (j = 0; j < V; j++)
            {
                if (dist[i][j] > dist[i][k] + dist[k][j])
                {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    average(dist);
    return;
}

float average(int graph[][V])
{
    int summ = 0;
    int edgeCount = 0;

    int i = 0, j = 0;
    // printf
    for (i = 0; i < V; i++)
    {
        for (j = 0; j < V; j++)
        {
            if (graph[i][j] == INF || graph[i][j] == 0)
                continue;

            summ += graph[i][j];
            edgeCount += 1;
            // printf("%d, ", graph[i][j]);
        }
        // printf("\n");
    }

    printf("%.3f", 1.0 * summ / edgeCount);
    return 1.0 * summ / edgeCount;
}